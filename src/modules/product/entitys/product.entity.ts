import { CreateProductDto } from '../dto/create-product.dto';
import { Category, Product, ProductImg } from '@prisma/client';
import { ImgDto } from '../dto/img.dto';
import { GetProductDto } from '../dto/get-product.dto';
import { PromotionProductEntity } from 'src/modules/promotion/entities/Promotion-product.entity';
import { CategoryEntity } from 'src/modules/category/entitys/category.entity';
import { ImgEntity } from './Img.entity';

export class ProductEntity implements Product {
  id: string;
  name: string;
  price: number;
  imgs?: ProductImg[];
  categoryId: string;
  category?: Category;
  promotionProduct?: PromotionProductEntity[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(createProductDto: CreateProductDto): ProductEntity {
    return Object.assign(new ProductEntity(), createProductDto);
  }

  public static toDto(product: ProductEntity): GetProductDto {
    const imgsDto: ImgDto[] = ImgEntity.toDtoArray(product.imgs);
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

  private static calcPromotionalPrice(
    percentage: number,
    currentPrice: number,
  ): number {
    const percentageInDecimal = percentage / 100;
    const discountedValue = currentPrice - currentPrice * percentageInDecimal;
    const formatedValue = Number(discountedValue.toFixed(2));

    return formatedValue;
  }
}
