import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionRepository } from 'src/database/repositorys/promotion.repository';
import { Promotion } from './entities/promotion.entity';
import { PromotionProductDto } from './dto/promotion-product.dto';
import { PromotionsProducts } from './entities/PromotionProduct.entity';

@Injectable()
export class PromotionService {
  constructor(private promotionRepository: PromotionRepository) {}

  async create(createPromotionDto: CreatePromotionDto) {
    const promotion = new Promotion(createPromotionDto);
    return await this.promotionRepository.save(promotion);
  }

  async findAll() {
    return await this.promotionRepository.findAll();
  }

  async findOne(id: string) {
    return await this.promotionRepository.findById(id);
  }

  async findProductsByPromotionId(promotionId: string) {
    return await this.promotionRepository.findAllProductByPromotionId(
      promotionId,
    );
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto) {
    return await this.promotionRepository.update(id, updatePromotionDto);
  }

  async remove(id: string) {
    return await this.promotionRepository.delete(id);
  }

  async addPromotionProduct(
    promotionId: string,
    promotionProduct: PromotionProductDto | PromotionProductDto[],
  ) {
    if (!Array.isArray(promotionProduct)) {
      promotionProduct = [promotionProduct];
    }

    const product = PromotionsProducts.toEntityArray(
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
