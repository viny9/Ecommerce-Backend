import { $Enums } from '@prisma/client';
import { GetProductDto } from 'src/product/dto/get-product.dto';

export class GetOrderDto {
  constructor(
    readonly id: string,
    readonly amountTotal: number,
    readonly paymentMethod: $Enums.PaymentMethod,
    readonly paymentStatus: $Enums.PaymentStatus,
    readonly shippingCost: number,
    readonly products: GetProductDto[],
    readonly installments?: number,
  ) {}
}
