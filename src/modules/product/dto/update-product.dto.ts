import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional } from 'class-validator';
import { ImgDto } from './img.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  price: number;

  @IsOptional()
  imgs: ImgDto[];

  @IsOptional()
  removedImgs: ImgDto[];

  @IsOptional()
  categoryId?: string;
}
