import { OrderItem } from '@prisma/client';
import { productEntity } from 'src/modules/product/entitys/product.entity';

export class OrderItemEntity implements OrderItem {
  productId: string;
  orderId: string;
  product: productEntity;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(productId: string, orderId: string): OrderItemEntity {
    return Object.assign(new OrderItemEntity(), {
      productId,
      orderId,
    });
  }
}
