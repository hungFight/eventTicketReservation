import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FloorService } from './floor.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { NotFoundException } from 'src/helpers/exceptions/notFound.exception';

@Controller('floor')
export class FloorController {
    constructor(private readonly floorService: FloorService) {}

    @Post('create')
    async create(@Body() createFloorDto: CreateFloorDto) {
        return await this.floorService.create(createFloorDto);
    }

    @Get()
    async findAll() {
        return await this.floorService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const floor = await this.floorService.findOne(id);
        if (floor) return floor;
        throw new NotFoundException('Floor is not found');
    }

    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() updateFloorDto: UpdateFloorDto) {
        return await this.floorService.update(id, updateFloorDto);
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
        return await this.floorService.remove(id);
    }
}
