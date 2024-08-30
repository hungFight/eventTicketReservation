import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSeatTypeDto } from './dto/create-seat-type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat-type.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SeatTypeService {
    constructor(private prisma: PrismaService) {}

    async create(createSeatTypeDto: CreateSeatTypeDto) {
        try {
            if (!this.findOneByEventIdAndName(createSeatTypeDto.eventId, createSeatTypeDto.name)) {
                const id = uuidv4();
                return await this.prisma.seatTypes.create({ data: { ...createSeatTypeDto, id } });
            }
            throw new ConflictException(`Tên ghế đã tồn tại ${createSeatTypeDto.name}`);
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to create seat type');
        }
    }

    async findAll() {
        try {
            return await this.prisma.seatTypes.findMany();
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve seat types');
        }
    }
    async findOne(id: string) {
        try {
            return await this.prisma.seatTypes.findUnique({ where: { id } });
        } catch (error) {
            throw new InternalServerErrorException(`Failed to retrieve seat type with ID: ${id}`);
        }
    }
    async findOneByEventIdAndName(eventId: string, name: string) {
        try {
            return await this.prisma.seatTypes.findFirst({ where: { eventId, name } });
        } catch (error) {
            throw new InternalServerErrorException(`Failed to retrieve seat type with name: ${name}`);
        }
    }

    async update(id: string, updateSeatTypeDto: UpdateSeatTypeDto) {
        try {
            return await this.prisma.seatTypes.update({
                where: { id },
                data: updateSeatTypeDto,
            });
        } catch (error) {
            throw new InternalServerErrorException(`Failed to update seat type with ID: ${id}`);
        }
    }

    async remove(id: string) {
        try {
            return await this.prisma.seatTypes.delete({ where: { id } });
        } catch (error) {
            throw new InternalServerErrorException(`Failed to remove seat type with ID: ${id}`);
        }
    }
}
