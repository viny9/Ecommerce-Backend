import { randomUUID } from 'crypto';
import { CreateProductDto } from '../dto/create-product.dto';
import { Category, Product, ProductImg } from '@prisma/client';
import { ImgDto } from '../dto/img.dto';
import { GetProductDto } from '../dto/get-product.dto';
import { GetCategoryDto } from 'src/category/dto/get-category.dto';

export class Products implements Product {
  id: string;
  name: string;
  price: string;
  imgs?: ProductImg[];
  categoryId: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(createProductDto: CreateProductDto) {
    this.id = randomUUID();
    this.name = createProductDto.name;
    this.price = createProductDto.price;
  }

  static imgsDtoGenerate(imgs: ProductImg[]): ImgDto[] {
    return imgs.map((img) => {
      return new ImgDto(img.id, img.imgUrl);
    });
  }

  static toProductDto(product: Products): GetProductDto {
    const imgsDto = this.imgsDtoGenerate(product.imgs);

    const categoryDto = new GetCategoryDto(
      product.category.id,
      product.category.name,
    );

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      imgs: imgsDto,
      category: categoryDto,
    };
  }
}
