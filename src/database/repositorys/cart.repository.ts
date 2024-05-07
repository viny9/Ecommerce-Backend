import { Cart } from '@prisma/client';
import Repository from './abstract.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { CartItems } from 'src/cart/entitys/cart-item.entity';

@Injectable()
export class CartRepository extends Repository<Cart> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'cart');
  }

  async findCartByUserId(id: string) {
    return await this.prisma.cart.findUnique({
      where: {
        userId: id,
      },
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

  async addCartItem(cartId: string, productId: string): Promise<CartItems> {
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
