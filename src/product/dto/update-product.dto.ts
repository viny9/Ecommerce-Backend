import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional } from 'class-validator';
import { CartItem, ListItem, ProductImg } from '@prisma/client';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  price: string;

  @IsOptional()
  imgs: ProductImg[];

  @IsOptional()
  cart: CartItem[];

  @IsOptional()
  list: ListItem[];
}
