import { Module } from '@nestjs/common';
import { FloorService } from './floor.service';
import { FloorController } from './floor.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [FloorController],
    providers: [FloorService, PrismaService],
})
export class FloorModule {}
