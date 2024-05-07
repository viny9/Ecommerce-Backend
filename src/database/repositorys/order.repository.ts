import Repository from './abstract.repository';
import { Orders } from 'src/modules/order/entitys/order.entity';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { $Enums, Prisma } from '@prisma/client';

@Injectable()
export class OrderRepository extends Repository<Orders, Prisma.OrderInclude> {
  constructor(protected prisma: PrismaService) {
    const includes: Prisma.OrderInclude = {
      address: true,
      products: {
        include: {
          product: {
            include: {
              imgs: true,
              category: true,
              promotionProduct: true,
            },
          },
        },
      },
    };
    super(prisma, 'order', includes);
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
                promotionProduct: true,
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
                promotionProduct: true,
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
                promotionProduct: true,
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
                promotionProduct: true,
              },
            },
          },
        },
      },
    });
  }
}
