import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { NotFoundException } from 'src/helpers/exceptions/notFound.exception';
import { isArray } from 'class-validator';

@Controller('seat')
export class SeatController {
    constructor(private readonly seatService: SeatService) {}

    @Post('create')
    async create(@Body() createSeatDto: CreateSeatDto) {
        return await this.seatService.create(createSeatDto);
    }

    @Get()
    async findAll() {
        return await this.seatService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const seat = await this.seatService.findOne(id);
        if (seat) return seat;
        throw new NotFoundException('Seat is not found');
    }

    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
        return await this.seatService.update(id, updateSeatDto);
    }

    @Delete('delete')
    async remove(@Body() data: { seatId: string[] | string }) {
        if (isArray(data.seatId)) return await this.seatService.removeMany(data.seatId);
        else return await this.seatService.remove(data.seatId);
    }
}
