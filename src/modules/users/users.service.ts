import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { generateUniqueID } from 'src/helpers/utils';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    create(createUserDto: CreateUserDto) {
        const id = generateUniqueID() ?? generateUniqueID() ?? generateUniqueID() ?? generateUniqueID();
        if (!this.findOne(id)!) {
            return this.prisma.users.create({ data: { ...createUserDto, id } });
        } else {
            const id = generateUniqueID() ?? generateUniqueID() ?? generateUniqueID() ?? generateUniqueID();
            return this.prisma.users.create({ data: { ...createUserDto, id } });
        }
    }

    findAll() {
        return this.prisma.users.findMany();
    }

    findOne(id: string) {
        return this.prisma.users.findUnique({ where: { id } });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
