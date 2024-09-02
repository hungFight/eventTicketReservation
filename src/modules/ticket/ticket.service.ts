import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { v4 } from 'uuid';
import { generateUniqueCode } from 'src/helpers/utils';
import { NotFoundException } from 'src/helpers/exceptions/notFound.exception';
import { ConflictException } from 'src/helpers/exceptions/conflict.exception';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ConfirmTicketDto } from './dto/confirm-ticket.dto';
import { CustomException } from 'src/helpers/exceptions/Custom.exception';
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
                    if (error.code === 'P2002') throw new ConflictException(`Tickets are already exists. ${seatIds}`);
                    throw new InternalServerErrorException(error, 'Failed to create Ticket');
                }
            }); //This means that either all the operations within the transaction are completed successfully}
        } catch (error) {
            if (error.code === 'P2002') throw new ConflictException('Tickets are already exists.');
            throw new InternalServerErrorException(error, 'Failed to create Ticket');
        }
    }
    async findAllTicketsAvailable(eventId: string) {
        try {
            // find all tickets are available
            const existSeats = await this.prisma.events.findMany({
                where: { id: eventId },
                include: {
                    seatTypes: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            seats: {
                                where: { status: 'empty' },
                                select: {
                                    id: true,
                                    number: true,
                                    description: true,
                                    status: true,
                                    createdAt: true,
                                    floor: true,
                                },
                            },
                        },
                    },
                },
            });
            return existSeats;
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to retrieve seat `);
        }
    }
    async findAllTicketsInProcess() {
        try {
            const status = 'inProcess';
            const countSeat = await this.prisma.seats.count({ where: { status } });
            // find tickets are in process of payment
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
    async findAllBookingDetailByUserId(userId: string) {
        try {
            // find all user's booking details
            const ticketCodes = await this.prisma.ticketCode.findMany({
                where: { userId },
                select: {
                    id: true,
                    paymentStatus: true,
                    history: true,
                    code: true,
                    tickets: { include: { seat: { select: { id: true, number: true, seatType: { select: { id: true, name: true, price: true } } } } } },
                    user: { select: { id: true, fullName: true } },
                    createdAt: true,
                },
            });
            // calculate tickets for many
            const ticketCosts = ticketCodes.map((r) => {
                const totalCost = r.tickets.reduce((sum, t) => {
                    return sum + t.seat.seatType.price || 0;
                }, 0);
                return { totalCost, ticketCodes: r };
            });
            return ticketCosts;
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to retrieve ticket`);
        }
    }
    async findOneBookingDetailByUserId(userId: string, ticketCodeId: string) {
        try {
            const ticketCodes = await this.prisma.ticketCode.findFirst({
                where: { userId, id: ticketCodeId },
                select: {
                    id: true,
                    code: true,
                    paymentStatus: true,
                    tickets: { include: { seat: { select: { floor: true, id: true, number: true, seatType: { select: { id: true, name: true, price: true, event: true } } } } } },
                    user: { select: { id: true, fullName: true } },
                    createdAt: true,
                },
            });
            if (!ticketCodes) throw new NotFoundException('ticketCode is not available');
            // calculate tickets for one
            const totalCost = ticketCodes.tickets.reduce((sum, t) => {
                return sum + t.seat.seatType.price || 0;
            }, 0);
            return { totalCost, ticketCodes };
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to retrieve ticket`);
        }
    }
    async confirmBooking(confirmTicketDto: ConfirmTicketDto) {
        try {
            const ticketInfo = await this.findOneBookingDetailByUserId(confirmTicketDto.userId, confirmTicketDto.ticketCodeId);
            const user = await this.prisma.users.findUnique({ where: { id: confirmTicketDto.userId } });
            if (!user) throw new NotFoundException('User is not found!');
            if (!ticketInfo) throw new NotFoundException('User is not found!');

            const budget = user.budget - ticketInfo.totalCost;
            if (budget < 0) throw new BadRequestException('Insufficient funds to complete the purchase.');
            const event = await this.prisma.events.findUnique({ where: { id: confirmTicketDto.eventId } });
            // get all info
            const seatIds = ticketInfo.ticketCodes.tickets.map((t) => t.seat.id);
            const seatTypeInfo = ticketInfo.ticketCodes.tickets.map((t) => {
                return { id: t.seat.seatType.id, name: t.seat.seatType.name, price: t.seat.seatType.price };
            });
            const floorInfo = ticketInfo.ticketCodes.tickets.map((t) => t.seat.floor);
            const seatInfo = ticketInfo.ticketCodes.tickets.map((t) => {
                return { id: t.seat.id, number: t.seat.number };
            });
            // whole event's ticket information
            const history = {
                userId: user.id,
                createdAt: new Date(),
                eventInfo: event,
                seatInfo,
                seatTypeInfo,
                floorInfo,
            };
            await this.prisma.$transaction(async (prisma) => {
                try {
                    // update the user's budget
                    await prisma.users.update({ where: { id: user.id }, data: { budget: budget } });
                    await prisma.seats.updateMany({ where: { id: { in: seatIds } }, data: { status: 'full' } });
                    // update the ticketCode's paymentStatus
                    const dd = await prisma.ticketCode.update({ where: { id: confirmTicketDto.ticketCodeId }, data: { paymentStatus: true, expired: null, history } });
                } catch (error) {
                    throw new InternalServerErrorException(error, `Failed to confirm ticket`);
                }
            });
            return 'Confirm successfully';
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to confirm ticket`);
        }
    }
    async update(updateTicketDto: UpdateTicketDto[]) {
        try {
            return await Promise.all(
                updateTicketDto.map(async (t) => {
                    try {
                        return await this.prisma.tickets.update({ where: { id: t.ticketId }, data: { seatId: t.seatId } });
                    } catch (error) {
                        throw new CustomException(error, t.ticketId);
                    }
                }),
            );
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to update Ticket`);
        }
    }

    async deleteTicketCode(ticketCodeId: string) {
        try {
            const ticketCode = await this.prisma.ticketCode.findUnique({ where: { id: ticketCodeId } });
            if (ticketCode) {
                await this.prisma.tickets.deleteMany({ where: { ticketCodeId: ticketCode.id } });
                return await this.prisma.ticketCode.delete({ where: { id: ticketCodeId } });
            }
            throw new NotFoundException(`Ticket code record is not available. ${ticketCodeId}`);
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to delete Ticket code`);
        }
    }
    async cancelTicket(id: string, userId: string) {
        try {
            const ticketCode = await this.deleteTicketCode(id);
            // if (ticketCode.canceled && ticketCode.paymentStatus) {
            //     const user = await this.prisma.users.findUnique({ where: { id: userId } });
            //     if(user.id === ticketCode.userId){
            //      ticketCode.history
            //     }
            // }
            console.log(ticketCode.history, ' ticketCode.history');

            throw new NotFoundException(`Ticket code record is not available. ${id}`);
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to delete Ticket code`);
        }
    }
    remove(id: number) {
        return `This action removes a #${id} ticket`;
    }
}
