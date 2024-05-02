import { randomUUID } from 'crypto';
import { CreateProductDto } from '../dto/create-product.dto';
import { Category, Product, ProductImg } from '@prisma/client';
import { ImgDto } from '../dto/img.dto';
import { GetProductDto } from '../dto/get-product.dto';
import { GetCategoryDto } from 'src/category/dto/get-category.dto';
import { PromotionsProducts } from 'src/promotion/entities/PromotionProduct.entity';

export class Products implements Product {
  id: string;
  name: string;
  price: number;
  imgs?: ProductImg[];
  categoryId: string;
  category?: Category;
  promotionProduct?: PromotionsProducts[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(createProductDto: CreateProductDto) {
    this.id = randomUUID();
    this.name = createProductDto.name;
    this.price = createProductDto.price;
  }

  public static toProductDto(product: Products): GetProductDto {
    const imgsDto: ImgDto[] = this.imgsDtoGenerate(product.imgs);

    const categoryDto = new GetCategoryDto(
      product.category.id,
      product.category.name,
    );

    let promotionalValue: number = null;
    const promotion = product.promotionProduct[0];

    if (promotion) {
      promotionalValue = this.calcPromotionalPrice(
        promotion.percentage,
        product.price,
      );
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      imgs: imgsDto,
      category: categoryDto,
      promotionalValue: promotionalValue,
    };
  }

  private static imgsDtoGenerate(imgs: ProductImg[]): ImgDto[] {
    return imgs.map((img) => {
      return new ImgDto(img.id, img.imgUrl);
    });
  }

  private static calcPromotionalPrice(
    percentage: number,
    currentPrice: number,
  ) {
    const percentageInDecimal = percentage / 100;
    const discountedValue = currentPrice - currentPrice * percentageInDecimal;
    const formatedValue = Number(discountedValue.toFixed(2));

    return formatedValue;
  }
}
