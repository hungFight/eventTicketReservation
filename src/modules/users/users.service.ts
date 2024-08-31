import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { v4 } from 'uuid';
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    async create(createUserDto: CreateUserDto) {
        try {
            const id = v4();
            return this.prisma.users.create({ data: { ...createUserDto, id } });
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to create user');
        }
    }

    findAll() {
        try {
            return this.prisma.users.findMany();
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to retrieve users');
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
