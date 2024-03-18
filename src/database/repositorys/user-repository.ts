import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import Repository from './abstract.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'user');
  }

  async save(data: Partial<any>): Promise<User> {
    return await this.prisma.user.create({
      data: {
        id: randomUUID(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        isAdmin: data.isAdmin,
        stripeId: data.stripeId,
        cart: {
          create: {
            id: randomUUID(),
            products: undefined,
          },
        },

        list: {
          create: {
            id: randomUUID(),
            products: undefined,
          },
        },

        address: {
          create: {
            id: randomUUID(),
            cep: data.address.cep,
            city: data.address.city,
            neighborhood: data.address.neighborhood,
            number: data.address.number,
            state: data.address.state,
          },
        },
      },
    });
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.user.findMany({
      include: {
        address: true,
      },
    });
  }
}
