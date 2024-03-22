import { Cart } from '@prisma/client';
import Repository from './abstract.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateCartDto } from 'src/cart/dto/update-cart.dto';

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
              },
            },
          },
        },
      },
    });
  }

  async addCartItem(cartId: string, data: UpdateCartDto) {
    return await this.prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        products: {
          create: {
            product: {
              connect: {
                id: data.productId,
              },
            },
          },
        },
      },
      include: {
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

  async removeCartItem(cartId: string, data: UpdateCartDto) {
    return await this.prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        products: {
          delete: {
            productId_cartId: {
              productId: data.productId,
              cartId: cartId,
            },
          },
        },
      },
      include: {
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
