import { IsNotEmpty, IsNumber } from 'class-validator';
import { Products } from 'src/product/entitys/product.entity';

export class CreatePromotionDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNumber()
  percentage: number;

  @IsNotEmpty()
  startAt: Date;

  @IsNotEmpty()
  endAt: Date;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  products: string[] | Products[];
}
