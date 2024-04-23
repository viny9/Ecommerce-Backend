import { PromotionProduct } from '@prisma/client';
import { Products } from 'src/product/entitys/product.entity';

export class PromotionsProducts implements PromotionProduct {
  percentage: number;
  productId: string;
  product: Products;
  promotionId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
