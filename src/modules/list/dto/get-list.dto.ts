import { GetProductDto } from 'src/modules/product/dto/get-product.dto';

export class GetListDto {
  readonly id: string;
  readonly userId: string;
  readonly products: GetProductDto[];
}
