import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from 'src/helpers/exceptions/notFound.exception';
import { CustomException } from 'src/helpers/exceptions/Custom.exception';

@Injectable()
export class SeatService {
    constructor(private prisma: PrismaService) {}

    async create(createSeatDto: CreateSeatDto) {
        try {
            const isExistSeat = await this.findByFloorSeatTypeAndNumber(createSeatDto.seatTypeId, createSeatDto.floorId, createSeatDto.number);
            if (!isExistSeat) {
                const id = uuidv4();
                return await this.prisma.seats.create({ data: { ...createSeatDto, id } });
            }
            return `Ghế này đã tồn tại ( Tầng ${isExistSeat.floor.number} - Loại ghế ${isExistSeat.seatType.name} - Số ${isExistSeat.number} )`;
        } catch (error) {
            throw new CustomException(error, [createSeatDto.floorId, createSeatDto.seatTypeId]);
        }
    }

    async findAll() {
        try {
            return this.prisma.seats.findMany();
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve all seat data');
        }
    }

    async findOne(id: string) {
        try {
            return await this.prisma.seats.findUnique({ where: { id } });
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to retrieve seat data');
        }
    }
    async findByFloorSeatTypeAndNumber(seatTypeId: string, floorId: string, number: number) {
        try {
            return await this.prisma.seats.findFirst({
                where: { floorId, seatTypeId, number },
                include: {
                    floor: {
                        select: { number: true },
                    },
                    seatType: { select: { name: true } },
                },
            });
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to retrieve seat findByFloorSeatTypeAndNumber');
        }
    }
    async update(id: string, updateSeatDto: UpdateSeatDto) {
        const seat = await this.prisma.seats.findUnique({ where: { id } });
        if (!seat) throw new NotFoundException('Seat is not available');
        try {
            return await this.prisma.seats.update({ where: { id }, data: updateSeatDto });
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to update seat data');
        }
    }
    async remove(seatId: string) {
        try {
            const seat = await this.prisma.seats.findUnique({ where: { id: seatId }, select: { id: true, ticket: true } });
            const ticketIds = seat.ticket.map((t) => t.id);
            if (seat) {
                // delete references
                const countTickets = await this.prisma.tickets.deleteMany({ where: { id: { in: ticketIds } } });
                const countSeat = await this.prisma.seats.delete({ where: { id: seat.id } });
                return { message: 'Deleted a seat', countSeat, countTickets };
            }
            throw new NotFoundException('Seat record is not available');
        } catch (error) {
            if (error.code === 'P2025') throw new NotFoundException(`Seat with ID ${seatId} not found`);
            throw new InternalServerErrorException(error, 'Failed to delete seat data');
        }
    }
    async removeMany(seatId: string[]) {
        try {
            const seat = await this.prisma.seats.findMany({ where: { id: { in: seatId } }, select: { id: true, ticket: true } });
            const ticketIds = [];
            seat.forEach((r) => {
                r.ticket.map((t) => ticketIds.push(t.id));
            });
            const seatIds = seat.map((s) => s.id);
            if (seat) {
                // delete references
                const countTickets = await this.prisma.tickets.deleteMany({ where: { id: { in: ticketIds } } });
                const countSeats = await this.prisma.seats.deleteMany({ where: { id: { in: seatIds } } });
                return { message: 'Deleted successfully', countSeats, countTickets };
            }
            throw new NotFoundException('Seat records are not available');
        } catch (error) {
            if (error.code === 'P2025') throw new NotFoundException(`Seat with ID ${seatId} not found`);
            throw new InternalServerErrorException(error, 'Failed to delete seat data');
        }
    }
}
