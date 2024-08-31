import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeatTypeService } from './seat-type.service';
import { CreateSeatTypeDto } from './dto/create-seat-type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat-type.dto';
import { NotFoundException } from 'src/helpers/exceptions/notFound.exception';

@Controller('seatType')
export class SeatTypeController {
    constructor(private readonly seatTypeService: SeatTypeService) {}

    @Post('create')
    async create(@Body() createSeatTypeDto: CreateSeatTypeDto) {
        return await this.seatTypeService.create(createSeatTypeDto);
    }

    @Get()
    async findAll() {
        return await this.seatTypeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.seatTypeService.findOne(id);
    }

    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() updateSeatTypeDto: UpdateSeatTypeDto) {
        return await this.seatTypeService.update(id, updateSeatTypeDto);
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
        return await this.seatTypeService.remove(id);
    }
}
