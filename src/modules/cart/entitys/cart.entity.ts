import { Cart } from '@prisma/client';
import { GetCartDto } from '../dto/get-cart.dto';
import { Products } from 'src/modules/product/entitys/product.entity';
import { CartItemEntity } from './cart-item.entity';

export class CartEntity implements Cart {
  id: string;
  userId: string;
  products: CartItemEntity[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(userId: string): CartEntity {
    return Object.assign(new CartEntity(), { userId, products: [] });
  }

  public static toDto(cart: CartEntity): GetCartDto {
    return {
      id: cart.id,
      userId: cart.userId,
      products: cart.products.map((product) =>
        Products.toProductDto(product.product),
      ),
    };
  }
}
