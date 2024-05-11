import { $Enums, Order } from '@prisma/client';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderItemEntity } from './ordem-item.entity';
import { GetOrderDto } from '../dto/get-order.dto';
import { ProductEntity } from 'src/modules/product/entitys/product.entity';

export class OrderEntity implements Order {
  id: string;
  amountTotal: number;
  shippingCost: number;
  paymentMethod: $Enums.PaymentMethod;
  paymentStatus: $Enums.PaymentStatus;
  installments: number;
  userId: string;
  products?: OrderItemEntity[];
  addressId?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(createOrderDto: CreateOrderDto): OrderEntity {
    createOrderDto.products = createOrderDto.products.map((orderItem) => {
      return OrderItemEntity.toEntity(orderItem.productId, orderItem.orderId);
    });

    return Object.assign(new OrderEntity(), createOrderDto);
  }

  public static toDto(order: OrderEntity): GetOrderDto {
    return {
      id: order.id,
      amountTotal: order.amountTotal,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      shippingCost: order.shippingCost,
      installments: order.installments,
      products: order.products.map(({ product }) => {
        return ProductEntity.toDto(product);
      }),
    };
  }
}
