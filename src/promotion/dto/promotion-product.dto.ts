import { IsNumber, IsString } from 'class-validator';

export class PromotionProductDto {
  @IsString()
  productId: string;

  @IsNumber()
  percentage: number;
}
