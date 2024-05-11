import { Injectable } from '@nestjs/common';
import Repository from './abstract.repository';
import { PrismaService } from '../prisma.service';
import { PromotionProductEntity } from 'src/modules/promotion/entities/Promotion-product.entity';
import { Prisma } from '@prisma/client';
import { PromotionEntity } from 'src/modules/promotion/entities/promotion.entity';

@Injectable()
export class PromotionRepository extends Repository<
  PromotionEntity,
  Prisma.PromotionInclude
> {
  constructor(protected prisma: PrismaService) {
    const includes: Prisma.PromotionInclude = {
      products: {
        include: {
          product: {
            include: {
              category: true,
              imgs: true,
              promotionProduct: true,
            },
          },
        },
      },
    };
    super(prisma, 'promotion', includes);
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
            promotionProduct: true,
          },
        },
      },
    });
  }

  async findProductOnPromotionById(promotionId: string, productId: string) {
    return await this.prisma.promotionProduct.findUnique({
      where: {
        productId_promotionId: {
          productId,
          promotionId,
        },
      },
      include: {
        product: {
          include: {
            category: true,
            imgs: true,
            promotionProduct: true,
          },
        },
      },
    });
  }

  async removePromotionProductById(productId: string, promotionId: string) {
    return await this.prisma.promotionProduct.delete({
      where: { productId_promotionId: { productId, promotionId } },
      include: {
        product: {
          include: {
            category: true,
            imgs: true,
            promotionProduct: true,
          },
        },
      },
    });
  }
}
