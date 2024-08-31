import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { v4 } from 'uuid';
import { generateUniqueCode } from 'src/helpers/utils';
import { NotFoundException } from 'src/helpers/exceptions/notFound.exception';
import { ConflictException } from 'src/helpers/exceptions/conflict.exception';
import { UpdateTicketDto } from './dto/update-ticket.dto';
@Injectable()
export class TicketService {
    constructor(private prisma: PrismaService) {}
    async create(createTicketDto: CreateTicketDto) {
        try {
            const uniqueCode = generateUniqueCode();
            const seatIds = createTicketDto.data.map((r) => r.seatId);
            const currentTime = new Date();
            const timeExpiration = new Date(currentTime.getTime() + 5 * (60 * 1000));
            return await this.prisma.$transaction(async (prisma) => {
                try {
                    const ticketCode = await prisma.ticketCode.create({ data: { id: v4(), code: uniqueCode, userId: createTicketDto.userId, expired: timeExpiration } });
                    if (ticketCode?.id) {
                        const newTicketDto = createTicketDto.data.map((r) => {
                            return { seatId: r.seatId, id: v4(), ticketCodeId: ticketCode.id };
                        });
                        const upSeat = await prisma.seats.updateMany({ where: { id: { in: seatIds } }, data: { status: 'inProcess' } });

                        if (upSeat.count > 0) {
                            const ticket = await prisma.tickets.createMany({ data: newTicketDto });
                            console.log(ticketCode, newTicketDto, 'ticket', ticket);
                            return ticket;
                        }
                    }
                } catch (error) {
                    if (error.code === 'P2002') throw new ConflictException('Tickets are already exists.');
                    throw new InternalServerErrorException(error, 'Failed to create Ticket');
                }
            }); //This means that either all the operations within the transaction are completed successfully}
        } catch (error) {
            if (error.code === 'P2002') throw new ConflictException('Tickets are already exists.');
            throw new InternalServerErrorException(error, 'Failed to create Ticket');
        }
    }
    async findAllTicketsAvailable() {
        try {
            const countSeat = await this.prisma.seats.count({ where: { status: 'empty' } });
            const seats = await this.prisma.seats.findMany({
                where: { status: 'empty' },
                select: {
                    id: true,
                    number: true,
                    description: true,
                    floor: { select: { number: true, event: { select: { name: true, address: true } } } },
                    seatType: { select: { name: true, price: true } },
                },
            });
            return { seats, remainingSeats: countSeat };
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to retrieve seat type with name: ${name}`);
        }
    }
    async findAllTicketsInProcess() {
        try {
            const status = 'inProcess';
            const countSeat = await this.prisma.seats.count({ where: { status } });
            const seats = await this.prisma.seats.findMany({
                where: { status },
                select: {
                    id: true,
                    number: true,
                    description: true,
                    floor: { select: { number: true, event: { select: { name: true, address: true } } } },
                    seatType: { select: { name: true, price: true } },
                },
            });
            return { seats, inProcess: countSeat };
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to retrieve inProcess ticket`);
        }
    }
    findAll() {
        return `This action returns all ticket`;
    }
    findOne(id: number) {
        return `This action returns a #${id} ticket`;
    }
    async update(updateTicketDto: UpdateTicketDto[]) {
        try {
            return await Promise.all(
                updateTicketDto.map(async (t) => {
                    try {
                        return await this.prisma.tickets.update({ where: { id: t.ticketId }, data: { seatId: t.seatId } });
                    } catch (error) {
                        throw new InternalServerErrorException(`Failed to update ticket with ID ${t.ticketId}`);
                    }
                }),
            );
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to update Ticket`);
        }
    }

    remove(id: number) {
        return `This action removes a #${id} ticket`;
    }
}
