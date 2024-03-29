import { GetProductDto } from 'src/product/dto/get-product.dto';

export class GetOrderDto {
  constructor(
    readonly id: string,
    readonly amountTotal: number,
    readonly paymentMethod: string,
    readonly paymentStatus: string,
    readonly shippingCost: number,
    readonly products: GetProductDto[],
    readonly installments?: number,
  ) {}
}
