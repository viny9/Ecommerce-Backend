import { CartItem } from '@prisma/client';
import { Products } from 'src/product/entitys/product.entity';

export class CartItems implements CartItem {
  productId: string;
  cartId: string;
  product: Products;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(productId: string, cartId: string): CartItems {
    return Object.assign(new CartItems(), {
      productId,
      cartId,
      createdAt: new Date(),
      updatedAt: undefined,
    });
  }
}
