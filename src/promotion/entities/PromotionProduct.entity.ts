import { PromotionProduct } from '@prisma/client';
import { Products } from 'src/product/entitys/product.entity';
import { PromotionProductDto } from '../dto/promotion-product.dto';

export class PromotionsProducts implements PromotionProduct {
  percentage: number;
  productId: string;
  product?: Products;
  promotionId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntityArray(
    promotionId: string,
    promotionProduct: {
      [key in keyof PromotionProductDto]: PromotionProductDto[key];
    }[],
  ): PromotionsProducts[] {
    return promotionProduct.map((product) => {
      return Object.assign(new PromotionsProducts(), {
        ...product,
        promotionId,
        createdAt: new Date(),
      });
    });
  }
}
