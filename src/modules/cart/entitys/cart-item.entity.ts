import { CartItem } from '@prisma/client';
import { ProductEntity } from 'src/modules/product/entitys/product.entity';

export class CartItemEntity implements CartItem {
  productId: string;
  cartId: string;
  product: ProductEntity;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(productId: string, cartId: string): CartItemEntity {
    return Object.assign(new CartItemEntity(), {
      productId,
      cartId,
      createdAt: new Date(),
      updatedAt: undefined,
    });
  }
}
