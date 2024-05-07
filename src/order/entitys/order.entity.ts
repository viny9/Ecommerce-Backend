import { $Enums, Order } from '@prisma/client';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderItems } from './ordem-item.entity';

export class Orders implements Order {
  id: string;
  amountTotal: number;
  shippingCost: number;
  paymentMethod: $Enums.PaymentMethod;
  paymentStatus: $Enums.PaymentStatus;
  installments: number;
  userId: string;
  products: OrderItems[];
  addressId?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(createOrderDto: CreateOrderDto): Orders {
    createOrderDto.products = createOrderDto.products.map((order) => {
      return OrderItems.toEntity(order.productId, order.orderId);
    });

    return Object.assign(new Orders(), createOrderDto);
  }
}
