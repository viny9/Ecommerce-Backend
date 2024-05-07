import { IsNotEmpty, IsNumber } from 'class-validator';
import { OrderItems } from '../entitys/ordem-item.entity';
import { $Enums } from '@prisma/client';

export class CreateOrderDto {
  @IsNumber()
  amountTotal: number;

  @IsNotEmpty()
  paymentMethod: $Enums.PaymentMethod;

  @IsNotEmpty()
  paymentStatus: $Enums.PaymentStatus;

  @IsNumber()
  shippingCost: number;

  @IsNumber()
  installments?: number;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  addressId: string;

  @IsNotEmpty()
  products: OrderItems[];
}
