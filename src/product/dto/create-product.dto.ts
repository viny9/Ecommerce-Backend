import { ProductImg } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: string;

  @IsOptional()
  imgs: ProductImg[];
}
