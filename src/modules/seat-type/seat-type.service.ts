import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSeatTypeDto } from './dto/create-seat-type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat-type.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma.service';
import { NotFoundException } from 'src/helpers/exceptions/notFound.exception';
import { CustomException } from 'src/helpers/exceptions/Custom.exception';

@Injectable()
export class SeatTypeService {
    constructor(private prisma: PrismaService) {}

    async create(createSeatTypeDto: CreateSeatTypeDto) {
        try {
            if (!(await this.findOneByIdAndName(createSeatTypeDto.eventId, 'eventId', createSeatTypeDto.name))) {
                const id = uuidv4();
                return await this.prisma.seatTypes.create({ data: { ...createSeatTypeDto, id } });
            }
            throw new ConflictException(`Tên ghế đã tồn tại ${createSeatTypeDto.name}`);
        } catch (error) {
            throw new CustomException(error, createSeatTypeDto.eventId);
        }
    }

    async findAll() {
        try {
            return await this.prisma.seatTypes.findMany();
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to retrieve seat types');
        }
    }
    async findOne(id: string) {
        try {
            return await this.prisma.seatTypes.findUnique({ where: { id } });
        } catch (error) {
            throw new InternalServerErrorException(`Failed to retrieve seat type with ID: ${id}`);
        }
    }
    async findOneByIdAndName(id: string, who: 'eventId' | 'id', name?: string) {
        try {
            if (!name) return false;
            return await this.prisma.seatTypes.findFirst({ where: { [who]: id, name } });
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to retrieve seat type with name: ${name}`);
        }
    }

    async update(id: string, updateSeatTypeDto: UpdateSeatTypeDto) {
        try {
            const event = await this.findOneByIdAndName(id, 'id', updateSeatTypeDto.name);
            if (!event) {
                return await this.prisma.seatTypes.update({
                    where: { id },
                    data: updateSeatTypeDto,
                });
            }
            throw new ConflictException(`Loại ghế ${updateSeatTypeDto.name} đã tồn tại`);
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to update seat type with ID: ${id}`);
        }
    }

    async remove(seatTypeId: string) {
        try {
            const seatType = await this.prisma.seatTypes.findUnique({ where: { id: seatTypeId }, select: { seats: { select: { id: true } } } }).then((data) => data.seats.map((s) => s.id));
            if (seatType) {
                // delete references
                const deletedSeat = await this.prisma.seats.deleteMany({ where: { id: { in: seatType } } });
                const deletedSeatType = await this.prisma.seatTypes.delete({ where: { id: seatTypeId } });
                return { message: 'Deleted successfully', countSeatType: deletedSeatType, countSeat: deletedSeat };
            } else throw new NotFoundException(`SeatType with ID ${seatTypeId} not found`);
        } catch (error) {
            throw new CustomException(error, seatTypeId);
        }
    }
    async removeMany(seatTypeId: string[]) {
        try {
            const seatType = await this.prisma.seatTypes.findMany({ where: { id: { in: seatTypeId } }, select: { seats: { select: { id: true } } } });
            if (seatType) {
                // delete references
                const deletedSeat = await this.prisma.seats.deleteMany({ where: { seatTypeId: { in: seatTypeId } } });
                const deletedSeatType = await this.prisma.seatTypes.deleteMany({ where: { id: { in: seatTypeId } } });
                return { message: 'Deleted successfully', countSeat: deletedSeat, countSeatType: deletedSeatType };
            } else throw new NotFoundException(`SeatType with ID ${seatTypeId} not found`);
        } catch (error) {
            throw new CustomException(error, seatTypeId);
        }
    }
}
