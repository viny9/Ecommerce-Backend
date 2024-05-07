import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { $Enums } from '@prisma/client';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  paymentStatus?: $Enums.PaymentStatus;
}
