import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(newUser: CreateUserDto) {
    const user: User = await this.prisma.user.create({
      data: {
        id: randomUUID(),
        created_at: new Date(),
        deleted_at: null,
        address_id: 'teste',
        card_id: 'teste',
        stripe_id: 'Teste',
        is_admin: true,
        ...newUser,
      },
    });

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    return user;
  }
}
