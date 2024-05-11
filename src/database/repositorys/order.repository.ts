import Repository from './abstract.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { $Enums, Order, Prisma } from '@prisma/client';
import { OrderEntity } from 'src/modules/order/entitys/order.entity';

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

  async save(data: Partial<OrderEntity>): Promise<Order> {
    return await this.prisma.order.create({
      data: {
        amountTotal: data.amountTotal,
        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentStatus,
        shippingCost: data.shippingCost,
        installments: data.installments,
        userId: data.userId,
        address: {
          create: {
            ...data.address,
          },
        },
        products: {
          createMany: {
            data: data.products,
          },
        },
      },
      include: {
        address: true,
        products: {
          include: {
            product: {
              include: {
                category: true,
                imgs: true,
                promotionProduct: true,
              },
            },
          },
        },
      },
    });
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
