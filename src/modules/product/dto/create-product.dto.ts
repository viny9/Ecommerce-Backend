import { IsNotEmpty, IsOptional } from 'class-validator';
import { ImgDto } from './img.dto';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  categoryId: string;

  @IsOptional()
  imgs: ImgDto[];
}
