import { ProductImg } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  categoryId: string;

  @IsOptional()
  imgs: ProductImg[];
}
