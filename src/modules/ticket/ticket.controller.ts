import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Post('booking')
    create(@Body() createTicketDto: CreateTicketDto) {
        return this.ticketService.create(createTicketDto);
    }

    @Get()
    findAll() {
        return this.ticketService.findAll();
    }
    @Get('available')
    findAllTicketsAvailable() {
        return this.ticketService.findAllTicketsAvailable();
    }
    @Get('inprocess')
    findAllTicketsInProcess() {
        return this.ticketService.findAllTicketsInProcess();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ticketService.findOne(+id);
    }

    @Patch('update')
    update(@Body() updateTicketDto: UpdateTicketDto[]) {
        return this.ticketService.update(updateTicketDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ticketService.remove(+id);
    }
}
