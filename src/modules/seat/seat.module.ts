import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [SeatController],
    providers: [SeatService, PrismaService],
})
export class SeatModule {}
