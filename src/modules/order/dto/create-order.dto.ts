import { IsNotEmpty, IsNumber } from 'class-validator';
import { OrderItemEntity } from '../entitys/ordem-item.entity';
import { $Enums } from '@prisma/client';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';

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
  address: CreateAddressDto;

  @IsNotEmpty()
  products: OrderItemEntity[];
}
