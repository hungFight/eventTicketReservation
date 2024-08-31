import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
    getHome(): string {
        return 'Home Page';
    }
}
