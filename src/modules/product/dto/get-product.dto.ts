import { GetCategoryDto } from 'src/modules/category/dto/get-category.dto';
import { ImgDto } from '../../img/dto/img.dto';

export class GetProductDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly price: number,
    readonly imgs: ImgDto[],
    readonly category: GetCategoryDto,
    readonly promotionalValue?: number | null,
  ) {}
}
