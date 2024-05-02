import { Injectable } from '@nestjs/common';
import Repository from './abstract.repository';
import { Promotion } from 'src/promotion/entities/promotion.entity';
import { PrismaService } from '../prisma.service';
import { PromotionsProducts } from 'src/promotion/entities/PromotionProduct.entity';

@Injectable()
export class PromotionRepository extends Repository<Promotion> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'promotion');
  }

  async addPromotionProduct(productPromotion: PromotionsProducts[]) {
    return await this.prisma.promotionProduct.createMany({
      data: productPromotion,
    });
  }

  async findAllProductByPromotionId(promotionId: string) {
    return await this.prisma.promotionProduct.findMany({
      where: { promotionId },
      include: {
        product: {
          include: {
            imgs: true,
            category: true,
          },
        },
      },
    });
  }

  async removePromotionProductById(productId: string, promotionId: string) {
    return await this.prisma.promotionProduct.delete({
      where: { productId_promotionId: { productId, promotionId } },
    });
  }
}
