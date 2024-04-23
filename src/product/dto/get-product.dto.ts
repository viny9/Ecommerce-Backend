import { GetCategoryDto } from 'src/category/dto/get-category.dto';
import { ImgDto } from './img.dto';

export class GetProductDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly price: number,
    readonly imgs: ImgDto[],
    readonly category: GetCategoryDto,
    readonly promotionValue?: number,
  ) {}
}
