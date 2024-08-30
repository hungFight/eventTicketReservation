import { v4 as uuidv4 } from 'uuid';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma.service';
import { NotFoundException } from 'src/helpers/exceptions/notFound.exception';
@Injectable()
export class EventService {
    constructor(private prisma: PrismaService) {}
    async create(createEventDto: CreateEventDto) {
        try {
            const id = uuidv4();
            return await this.prisma.events.create({ data: { ...createEventDto, id } });
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to create Event');
        }
    }
    async findAll() {
        try {
            return await this.prisma.events.findMany();
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to retrieve Event data');
        }
    }

    async findOne(id: string) {
        const event = await this.prisma.events.findUnique({ where: { id } });
        return event;
    }

    async update(id: string, updateEventDto: UpdateEventDto) {
        const event = await this.prisma.events.findUnique({ where: { id } });
        if (!event) throw new NotFoundException(`Event with ID ${id} not found`);
        try {
            return await this.prisma.events.update({
                where: { id },
                data: updateEventDto,
            });
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to update event with ID: ${id}`);
        }
    }

    async remove(id: string) {
        const event = await this.prisma.events.findUnique({ where: { id }, select: { name: true, floors: { select: { id: true } } } });
        if (!event) throw new NotFoundException(`Event with ID ${id} not found`);
        const floorIds = event.floors.map((r) => r.id);
        try {
            await this.prisma.$transaction(async (prisma) => {
                //remove data in a consistent await
                await prisma.seats.deleteMany({ where: { floorId: { in: floorIds } } });
                await prisma.floors.deleteMany({ where: { id: { in: floorIds } } });
                await prisma.events.delete({ where: { id } });
            });
            return `Delete ${event.name} event successful`;
        } catch (error) {
            throw new InternalServerErrorException(error, `Failed to remove event with ID: ${id}`);
        }
    }
}
