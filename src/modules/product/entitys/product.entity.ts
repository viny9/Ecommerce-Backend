import { randomUUID } from 'crypto';
import { CreateProductDto } from '../dto/create-product.dto';
import { Category, Product, ProductImg } from '@prisma/client';
import { ImgDto } from '../dto/img.dto';
import { GetProductDto } from '../dto/get-product.dto';
import { PromotionsProducts } from 'src/modules/promotion/entities/PromotionProduct.entity';
import { CategoryEntity } from 'src/modules/category/entitys/category.entity';

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
    this.categoryId = createProductDto.categoryId;
  }

  public static toProductDto(product: Products): GetProductDto {
    const imgsDto: ImgDto[] = this.imgsDtoGenerate(product.imgs);

    const categoryDto = CategoryEntity.toDto(product.category);

    let promotionalValue: number = null;
    const promotion = product.promotionProduct[0] || null;

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
