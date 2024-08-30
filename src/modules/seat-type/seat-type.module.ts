import { Module } from '@nestjs/common';
import { SeatTypeService } from './seat-type.service';
import { SeatTypeController } from './seat-type.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [SeatTypeController],
    providers: [SeatTypeService, PrismaService],
})
export class SeatTypeModule {}
