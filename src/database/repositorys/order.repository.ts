import Repository from './abstract.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { $Enums, Order, Prisma } from '@prisma/client';

@Injectable()
export class OrderRepository extends Repository<Order, Prisma.OrderInclude> {
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

  async findAllByUserId(userId: string): Promise<Order[]> {
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

  async updatePaymentStatus(
    id: string,
    status: $Enums.PaymentStatus,
  ): Promise<Order> {
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
