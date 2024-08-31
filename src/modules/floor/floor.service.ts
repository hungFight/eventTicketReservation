import { v4 as uuidv4 } from 'uuid';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { PrismaService } from 'src/prisma.service';
import { NotFoundException } from 'src/helpers/exceptions/notFound.exception';

@Injectable()
export class FloorService {
    constructor(private prisma: PrismaService) {}

    async create(createFloorDto: CreateFloorDto) {
        try {
            const id = uuidv4();
            return await this.prisma.floors.create({ data: { ...createFloorDto, id } });
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to create Floor');
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

    async update(id: string, updateFloorDto: UpdateFloorDto) {
        const floor = await this.prisma.floors.findUnique({ where: { id } });
        if (!floor) throw new NotFoundException('Floor is not available');
        try {
            return await this.prisma.floors.update({ where: { id }, data: updateFloorDto });
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to update Floor data');
        }
    }

    async remove(id: string) {
        try {
            return await this.prisma.floors.delete({ where: { id } });
        } catch (error) {
            if (error.code === 'P2025') throw new NotFoundException(`Seat with ID ${id} not found`);
            throw new InternalServerErrorException(error, 'Failed to delete Floor data');
        }
    }
}
