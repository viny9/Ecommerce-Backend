import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Users } from 'src/user/entitys/user.entity';
import { User } from '@prisma/client';
import Repository from './abstract.repository';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'user');
  }

  async save(data: Users): Promise<Users> {
    return await this.prisma.user.create({
      data: {
        ...data,
        address: {
          create: {
            id: randomUUID(),
            ...data.address,
          },
        },
        cart: {
          create: {
            id: randomUUID(),
            products: {},
          },
        },
        card: {},
        list: {
          create: {
            id: randomUUID(),
            products: {},
          },
        },
      },
      include: {
        address: true,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.user.findMany({
      include: {
        address: true,
        card: true,
      },
    });
  }

  async findById(id: string): Promise<Users> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        address: true,
        card: true,
      },
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<Users> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        address: {
          update: data.address,
        },
      },
      include: {
        address: true,
        card: true,
      },
    });
  }

  async delete(id: string): Promise<Users> {
    return await this.prisma.user.delete({
      where: { id },
      include: {
        address: true,
        card: true,
      },
    });
  }
}
