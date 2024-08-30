import { v4 as uuidV4 } from 'uuid';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { NotFoundException } from 'src/helpers/exceptions/notFound.exception';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post('create')
    async create(@Body() createEventDto: CreateEventDto) {
        return await this.eventService.create(createEventDto);
    }

    @Get()
    async findAll() {
        return await this.eventService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const event = await this.eventService.findOne(id);
        if (event) return event;
        throw new NotFoundException('Event is not found');
    }

    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
        return await this.eventService.update(id, updateEventDto);
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
        return await this.eventService.remove(id);
    }
}
