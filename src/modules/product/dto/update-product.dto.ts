import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional } from 'class-validator';
import { ProductImg } from '@prisma/client';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  price: number;

  @IsOptional()
  imgs: ProductImg[];

  @IsOptional()
  categoryId?: string;
}
