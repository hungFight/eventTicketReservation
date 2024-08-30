import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    // @Post()
    // create(@Body() createTicketDto: CreateTicketDto) {
    //     return this.ticketService.create(createTicketDto);
    // }

    @Get()
    findAll() {
        return this.ticketService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ticketService.findOne(+id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    //     return this.ticketService.update(+id, updateTicketDto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ticketService.remove(+id);
    }
}
