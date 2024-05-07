import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionRepository } from 'src/database/repositorys/promotion.repository';
import { PromotionProductDto } from './dto/promotion-product.dto';
import { PromotionEntity } from './entities/promotion.entity';
import { PromotionProductEntity } from './entities/Promotion-product.entity';

@Injectable()
export class PromotionService {
  constructor(private repository: PromotionRepository) {}

  async newPromotion(createPromotionDto: CreatePromotionDto) {
    const promotion = PromotionEntity.toEntity(createPromotionDto);
    return await this.repository.save(promotion);
  }

  async findAllPromotions() {
    return await this.repository.findAll();
  }

  async findPromotionById(id: string) {
    return await this.repository.findById(id);
  }

  async findProductsByPromotionId(promotionId: string) {
    return await this.repository.findAllProductByPromotionId(promotionId);
  }

  async updatePromotion(id: string, updatePromotionDto: UpdatePromotionDto) {
    return await this.repository.update(id, updatePromotionDto);
  }

  async removePromotion(id: string) {
    return await this.repository.delete(id);
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

    product.forEach((product) => {
      const exists = this.repository.findProductOnPromotionById(
        product.promotionId,
        product.productId,
      );

      if (exists)
        throw new BadRequestException('Este produto já está em uma promoção');
    });

    return await this.repository.addPromotionProduct(product);
  }

  async removePromotionProduct(promotionId: string, productId: string) {
    const exists = this.repository.findProductOnPromotionById(
      promotionId,
      productId,
    );

    if (!exists)
      throw new BadRequestException(
        'Nenhum producto com esse id foi acho nessa promoção',
      );

    return await this.repository.removePromotionProductById(
      productId,
      promotionId,
    );
  }
}
