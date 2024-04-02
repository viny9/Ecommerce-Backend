import { OrderItem } from '@prisma/client';
import { Products } from 'src/product/entitys/product.entity';

export class OrderItems implements OrderItem {
  productId: string;
  orderId: string;
  product: Products;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
