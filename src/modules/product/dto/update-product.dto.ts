import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional } from 'class-validator';
import { ImgDto } from './img.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  removedImgs: ImgDto[];
}
