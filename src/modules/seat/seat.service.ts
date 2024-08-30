import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from 'src/helpers/exceptions/notFound.exception';

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
            throw new InternalServerErrorException(error, 'Failed to create seat');
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
    async remove(id: string) {
        try {
            return await this.prisma.seats.delete({ where: { id } });
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to delete seat data');
        }
    }
}
