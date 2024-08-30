import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeatTypeService } from './seat-type.service';
import { CreateSeatTypeDto } from './dto/create-seat-type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat-type.dto';

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
    findOne(@Param('id') id: string) {
        return this.seatTypeService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSeatTypeDto: UpdateSeatTypeDto) {
        return this.seatTypeService.update(id, updateSeatTypeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.seatTypeService.remove(id);
    }
}
