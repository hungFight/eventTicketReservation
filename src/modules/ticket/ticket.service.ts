import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TicketService {
    constructor(private prisma: PrismaService) {}
    findAll() {
        return `This action returns all ticket`;
    }

    findOne(id: number) {
        return `This action returns a #${id} ticket`;
    }

    remove(id: number) {
        return `This action removes a #${id} ticket`;
    }
}
