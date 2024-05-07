import { Cart, Prisma } from '@prisma/client';
import Repository from './abstract.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { CartItemEntity } from 'src/modules/cart/entitys/cart-item.entity';
import { CartEntity } from 'src/modules/cart/entitys/cart.entity';

@Injectable()
export class CartRepository extends Repository<Cart, Prisma.CartInclude> {
  constructor(protected prisma: PrismaService) {
    const includes = {
      products: {
        include: {
          product: {
            include: { imgs: true, category: true, promotionProduct: true },
          },
        },
      },
    };
    super(prisma, 'cart', includes);
  }

  async findCartByUserId(userId: string): Promise<CartEntity> {
    return await this.prisma.cart.findUnique({
      where: { userId },
      include: {
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

  async findCartProductById(cartId: string, productId: string) {
    return await this.prisma.cartItem.findUnique({
      where: {
        productId_cartId: {
          productId,
          cartId,
        },
      },
    });
  }

  async addCartItem(
    cartId: string,
    productId: string,
  ): Promise<CartItemEntity> {
    return await this.prisma.cartItem.create({
      data: {
        cartId,
        productId,
      },
      include: {
        product: {
          include: {
            imgs: true,
            category: true,
            promotionProduct: true,
          },
        },
      },
    });
  }

  async removeCartItem(cartId: string, productId: string) {
    return await this.prisma.cartItem.delete({
      where: {
        productId_cartId: {
          cartId,
          productId,
        },
      },
      include: {
        product: {
          include: {
            imgs: true,
            category: true,
            promotionProduct: true,
          },
        },
      },
    });
  }
}
