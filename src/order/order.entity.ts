import { Order, Product } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { randomUUID } from 'crypto';

export class Orders implements Order {
  id: string;
  amountTotal: number;
  paymentMethod: string;
  paymentStatus: string;
  shippingCost: number;
  installments: number;
  userId: string;
  products: Product[];
  addressId: string;
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
