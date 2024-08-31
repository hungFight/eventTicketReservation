import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}
    @Cron(CronExpression.EVERY_MINUTE)
    async handleExpirations() {
        console.log('This task run every minute');
        try {
            const ticketCode = await this.prisma.ticketCode.findFirst({ where: { expired: { lt: new Date() } }, include: { tickets: { select: { seatId: true } } } });

            if (ticketCode?.id) {
                await this.prisma.$transaction(async (prisma) => {
                    try {
                        const seatIds = ticketCode.tickets.map((r) => r.seatId);
                        //Delete associated tickets
                        const deletedTickets = await prisma.tickets.deleteMany({ where: { ticketCodeId: ticketCode.id } });
                        console.log(`Deleted tickets: ${deletedTickets.count}`);
                        //Update seats status
                        const updatedSeats = await prisma.seats.updateMany({ where: { id: { in: seatIds } }, data: { status: 'empty' } });
                        console.log(`Update seat status: ${updatedSeats.count}`);
                        //Delete associated TicketCode
                        const deletedTicketCode = await prisma.ticketCode.delete({ where: { id: ticketCode.id }, select: { tickets: { select: { seat: { select: { number: true } } } } } });
                        console.log(`Deleted ticketCode: ${deletedTicketCode.tickets}`);
                    } catch (error) {
                        throw new InternalServerErrorException(error, 'handleExpirations error In');
                    }
                });
            }
        } catch (error) {
            throw new InternalServerErrorException(error, 'handleExpirations error');
        }
    }
}
