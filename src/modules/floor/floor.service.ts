import { v4 as uuidv4 } from 'uuid';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { PrismaService } from 'src/prisma.service';
import { NotFoundException } from 'src/helpers/exceptions/notFound.exception';
import { CustomException } from 'src/helpers/exceptions/Custom.exception';
import { ConflictException } from 'src/helpers/exceptions/conflict.exception';

@Injectable()
export class FloorService {
    constructor(private prisma: PrismaService) {}

    async create(createFloorDto: CreateFloorDto) {
        try {
            if (!(await this.findOneByNumber(createFloorDto.number))) {
                const id = uuidv4();
                return await this.prisma.floors.create({ data: { ...createFloorDto, id } });
            } else throw new ConflictException(`This floor already had ${createFloorDto.number}`);
        } catch (error) {
            throw new CustomException(error, createFloorDto.eventId);
        }
    }

    async findAll() {
        try {
            return await this.prisma.floors.findMany();
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to retrieve Floor data');
        }
    }

    async findOne(id: string) {
        try {
            return await this.prisma.floors.findUnique({ where: { id } });
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to retrieve Floor data');
        }
    }
    async findOneByNumber(number: number) {
        try {
            return await this.prisma.floors.findFirst({ where: { number } });
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to retrieve Floor data by Number');
        }
    }
    async update(id: string, updateFloorDto: UpdateFloorDto) {
        try {
            const floor = await this.prisma.floors.findUnique({ where: { id } });
            if (!floor) throw new NotFoundException('Floor is not available');
            return await this.prisma.floors.update({ where: { id }, data: updateFloorDto });
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to update Floor data');
        }
    }

    async remove(floorId: string) {
        try {
            const floor = await this.prisma.floors.findUnique({ where: { id: floorId }, select: { seats: { select: { id: true } } } });
            const seatIds = [];
            floor.seats.forEach((s) => {
                seatIds.push(s.id);
            });
            if (floor) {
                const countTickets = await this.prisma.tickets.deleteMany({ where: { seatId: { in: seatIds } } });
                const countSeats = await this.prisma.seats.deleteMany({ where: { floorId } });
                const deletedFloor = await this.prisma.floors.delete({ where: { id: floorId } });
                return { message: 'Deleted successfully', deletedFloor, countSeats, countTickets };
            } else throw new NotFoundException(`Floor with ID ${floorId} not found`);
        } catch (error) {
            throw new CustomException(error, floorId);
        }
    }
    async removeMany(floorIds: string[]) {
        try {
            const floors = await this.prisma.floors.findMany({ where: { id: { in: floorIds } }, select: { seats: { select: { id: true } } } });
            const seatIds = [];
            floors.forEach((f) => {
                f.seats.forEach((s) => {
                    seatIds.push(s.id);
                });
            });
            if (floors) {
                const countTickets = await this.prisma.tickets.deleteMany({ where: { seatId: { in: seatIds } } });
                const countSeat = await this.prisma.seats.deleteMany({ where: { floorId: { in: floorIds } } });
                const countFloor = await this.prisma.floors.deleteMany({ where: { id: { in: floorIds } } });
                return { message: 'Deleted successfully', countSeat, countFloor, countTickets };
            } else throw new NotFoundException(`Floor with ID ${floorIds} not found`);
        } catch (error) {
            throw new CustomException(error, floorIds);
        }
    }
}
