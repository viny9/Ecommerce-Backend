import { Product } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';

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
  products: Product[];
}
