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

    async findAll() {
        try {
            return await this.prisma.users.findMany();
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to retrieve users');
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        try {
            return await this.prisma.users.update({ where: { id }, data: updateUserDto });
        } catch (error) {
            throw new InternalServerErrorException(error, 'Failed to retrieve users');
        }
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
