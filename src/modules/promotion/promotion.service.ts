import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionRepository } from 'src/database/repositorys/promotion.repository';
import { PromotionProductDto } from './dto/promotion-product.dto';
import { PromotionEntity } from './entities/promotion.entity';
import { PromotionProductEntity } from './entities/Promotion-product.entity';

@Injectable()
export class PromotionService {
  constructor(private promotionRepository: PromotionRepository) {}

  async newPromotion(createPromotionDto: CreatePromotionDto) {
    const promotion = PromotionEntity.toEntity(createPromotionDto);
    return await this.promotionRepository.save(promotion);
  }

  async findAllPromotions() {
    return await this.promotionRepository.findAll();
  }

  async findPromotionById(id: string) {
    return await this.promotionRepository.findById(id);
  }

  async findProductsByPromotionId(promotionId: string) {
    return await this.promotionRepository.findAllProductByPromotionId(
      promotionId,
    );
  }

  async updatePromotion(id: string, updatePromotionDto: UpdatePromotionDto) {
    return await this.promotionRepository.update(id, updatePromotionDto);
  }

  async removePromotion(id: string) {
    return await this.promotionRepository.delete(id);
  }

  async addPromotionProduct(
    promotionId: string,
    promotionProduct: PromotionProductDto | PromotionProductDto[],
  ) {
    if (!Array.isArray(promotionProduct)) {
      promotionProduct = [promotionProduct];
    }

    const product = PromotionProductEntity.toEntityArray(
      promotionId,
      promotionProduct,
    );

    return await this.promotionRepository.addPromotionProduct(product);
  }

  async removePromotionProduct(promotionId: string, productId: string) {
    return await this.promotionRepository.removePromotionProductById(
      productId,
      promotionId,
    );
  }
}
