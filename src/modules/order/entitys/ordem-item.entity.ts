import { OrderItem } from '@prisma/client';
import { ProductEntity } from 'src/modules/product/entitys/product.entity';

export class OrderItemEntity implements OrderItem {
  productId: string;
  orderId: string;
  product: ProductEntity;
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
