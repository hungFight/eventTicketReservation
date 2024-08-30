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

@Module({
    imports: [
        EventModule,
        FloorModule,
        SeatTypeModule,
        SeatModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
