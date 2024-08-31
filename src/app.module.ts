import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EventController } from './modules/event/event.controller';
import { EventModule } from './modules/event/event.module';
import { PrismaService } from './prisma.service';
import { FloorModule } from './modules/floor/floor.module';
import { SeatTypeModule } from './modules/seat-type/seat-type.module';
import { SeatModule } from './modules/seat/seat.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { UsersModule } from './modules/users/users.module';
import { WorkerModule } from './worker/worker.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        EventModule,
        FloorModule,
        SeatTypeModule,
        SeatModule,
        TicketModule,
        UsersModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        WorkerModule,
        ScheduleModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
