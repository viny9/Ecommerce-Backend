import { $Enums, Order } from '@prisma/client';
import { CreateOrderDto } from '../dto/create-order.dto';
import { randomUUID } from 'crypto';
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

  constructor(createOrderDto: CreateOrderDto) {
    this.id = randomUUID();
    this.amountTotal = createOrderDto.amountTotal;
    this.paymentMethod = createOrderDto.paymentMethod;
    this.paymentStatus = createOrderDto.paymentStatus;
    this.shippingCost = createOrderDto.shippingCost;
    this.installments = createOrderDto.installments;
    this.userId = createOrderDto.userId;
    this.products = createOrderDto.products;
  }
}
