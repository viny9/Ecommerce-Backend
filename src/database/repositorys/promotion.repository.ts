import { Injectable } from '@nestjs/common';
import Repository from './abstract.repository';
import { PromotionEntity } from 'src/modules/promotion/entities/promotion.entity';
import { PrismaService } from '../prisma.service';
import { PromotionProductEntity } from 'src/modules/promotion/entities/Promotion-product.entity';

@Injectable()
export class PromotionRepository extends Repository<PromotionEntity> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'promotion');
  }

  async addPromotionProduct(productPromotion: PromotionProductEntity[]) {
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
