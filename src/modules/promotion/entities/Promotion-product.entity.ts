import { PromotionProduct } from '@prisma/client';
import { ProductEntity } from 'src/modules/product/entitys/product.entity';
import { PromotionProductDto } from '../dto/promotion-product.dto';

export class PromotionProductEntity implements PromotionProduct {
  percentage: number;
  productId: string;
  product?: ProductEntity;
  promotionId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntityArray(
    promotionId: string,
    promotionProduct: {
      [key in keyof PromotionProductDto]: PromotionProductDto[key];
    }[],
  ): PromotionProductEntity[] {
    return promotionProduct.map((product) => {
      return Object.assign(new PromotionProductEntity(), {
        ...product,
        promotionId,
        createdAt: new Date(),
      });
    });
  }
}
