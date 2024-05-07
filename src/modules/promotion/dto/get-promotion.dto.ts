import { GetProductDto } from 'src/modules/product/dto/get-product.dto';

export class GetPromotionDto {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  description: string;
  products: GetProductDto[];
}
