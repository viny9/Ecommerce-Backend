import { GetProductDto } from 'src/modules/product/dto/get-product.dto';

export class GetCartDto {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly products: GetProductDto[],
  ) {}
}