import { InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export const generateUniqueCode = () => {
    const digits = String(Math.floor(Math.random() * 8888888888 + 1000000000)); // 10 characters
    if (digits.length === 10) return digits;
    return null;
};
