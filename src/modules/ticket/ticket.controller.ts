import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ConfirmTicketDto } from './dto/confirm-ticket.dto';

@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Post('booking')
    async create(@Body() createTicketDto: CreateTicketDto) {
        return await this.ticketService.create(createTicketDto);
    }

    @Get('bookingDetail/:userId')
    async findAllBookingDetailByUserId(@Param('userId') userId: string) {
        return await this.ticketService.findAllBookingDetailByUserId(userId);
    }
    @Get('available/:eventId')
    async findAllTicketsAvailable(@Param('eventId') eventId: string) {
        console.log('sss');
        return await this.ticketService.findAllTicketsAvailable(eventId);
    }
    @Get('inprocess')
    async findAllTicketsInProcess() {
        return await this.ticketService.findAllTicketsInProcess();
    }
    @Post('confirmBooking')
    async confirmBooking(@Body() confirmTicketDto: ConfirmTicketDto) {
        return await this.ticketService.confirmBooking(confirmTicketDto);
    }

    @Patch('update')
    async update(@Body() updateTicketDto: UpdateTicketDto[]) {
        return await this.ticketService.update(updateTicketDto);
    }

    @Delete('cancelTicket/:id')
    async cancelTicket(@Param('id') id: string, @Body() data: { userId: string; eventId: string }) {
        return await this.ticketService.cancelTicket(id, data.userId, data.eventId);
    }
    @Delete('deleteTicketCodeByUser/:id')
    async deleteTicketCode(@Param('id') ticketCodeId: string) {
        return await this.ticketService.deleteTicketCode(ticketCodeId);
    }
}
