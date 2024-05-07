import { Orders } from 'src/order/entitys/order.entity';
import Repository from './abstract.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';

@Injectable()
export class OrderRepository extends Repository<Orders> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'order');
  }

  // Adicionar agora cartão
  async save(data: Orders): Promise<Orders> {
    return await this.prisma.order.create({
      data: {
        ...data,
        products: {
          create: data.products.map((product) => ({
            product: {
              connect: { id: product.productId },
            },
          })),
        },
      },
      include: {
        address: true,
        products: {
          include: {
            product: {
              include: {
                imgs: true,
                category: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(): Promise<Orders[]> {
    return await this.prisma.order.findMany({
      include: {
        address: true,
        products: {
          include: {
            product: {
              include: {
                imgs: true,
                category: true,
              },
            },
          },
        },
      },
    });
  }

  async findAllByUserId(userId: string): Promise<Orders[]> {
    return await this.prisma.order.findMany({
      where: { userId },
      include: {
        address: true,
        products: {
          include: {
            product: {
              include: {
                imgs: true,
                category: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Orders> {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        address: true,
        products: {
          include: {
            product: {
              include: {
                imgs: true,
                category: true,
              },
            },
          },
        },
      },
    });
  }

  async updatePaymentStatus(
    id: string,
    status: $Enums.PaymentStatus,
  ): Promise<Orders> {
    return this.prisma.order.update({
      where: { id },
      data: {
        paymentStatus: status,
      },
      include: {
        address: true,
        products: {
          include: {
            product: {
              include: {
                imgs: true,
                category: true,
              },
            },
          },
        },
      },
    });
  }
}
