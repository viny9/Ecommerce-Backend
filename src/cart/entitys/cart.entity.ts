import { Cart } from '@prisma/client';
import { CartItems } from './cart-item.entity';
import { GetCartDto } from '../dto/get-cart.dto';
import { Products } from 'src/product/entitys/product.entity';

export class Carts implements Cart {
  id: string;
  userId: string;
  products: CartItems[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(cartId: string, userId: string): Carts {
    return Object.assign(new Carts(), { cartId, userId, products: [] });
  }

  static toCartDto(cart: Carts): GetCartDto {
    return {
      id: cart.id,
      userId: cart.userId,
      products: cart.products.map((product) =>
        Products.toProductDto(product.product),
      ),
    };
  }
}
