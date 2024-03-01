import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    await this.prismaService.user.create({
      data: {
        id: randomUUID(),
        created_at: new Date(),
        ...createUserDto,
      },
    });
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.prismaService.user.findMany();
    return users;
  }

  async findOneById(id: string): Promise<User> {
    const user: User = await this.prismaService.user.findUnique({
      where: { id },
    });

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user: User = await this.prismaService.user.findUnique({
      where: { email },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const a: User = await this.prismaService.user.update({
      data: updateUserDto,
      where: { id },
    });

    return a;
  }

  async remove(id: string): Promise<User> {
    const user: User = await this.prismaService.user.delete({
      where: { id },
    });

    return user;
  }
}
