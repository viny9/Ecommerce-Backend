import { IsNotEmpty, IsNumber } from 'class-validator';
import { OrderItems } from '../entitys/ordem-item.entity';

export class CreateOrderDto {
  @IsNumber()
  amountTotal: number;

  @IsNotEmpty()
  paymentMethod: string;

  @IsNotEmpty()
  paymentStatus: string;

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
