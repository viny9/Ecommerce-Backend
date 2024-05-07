import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionRepository } from 'src/database/repositorys/promotion.repository';
import { PromotionProductDto } from './dto/promotion-product.dto';
import { PromotionEntity } from './entities/promotion.entity';
import { PromotionProductEntity } from './entities/Promotion-product.entity';
import { AlredyExistsException } from 'src/shared/exceptions/AlredyExistsException';
import { productEntity } from '../product/entitys/product.entity';

@Injectable()
export class PromotionService {
  constructor(private repository: PromotionRepository) {}

  async newPromotion(createPromotionDto: CreatePromotionDto) {
    const exists = await this.repository.checkIfExists(
      'name',
      createPromotionDto.name,
    );

    if (exists)
      throw new AlredyExistsException('Promoção com este nome já existe');

    const promotion = PromotionEntity.toEntity(createPromotionDto);
    const res = await this.repository.save(promotion);
    return PromotionEntity.toDto(res);
  }

  async findAllPromotions() {
    const res = await this.repository.findAll();

    return res.map((promotion) => {
      return PromotionEntity.toDto(promotion);
    });
  }

  async findPromotionById(id: string) {
    const exists = await this.repository.checkIfExists('id', id);
    if (!exists) throw new NotFoundException('Nenhuma promoção com este id');

    const res = await this.repository.findById(id);
    return PromotionEntity.toDto(res);
  }

  async findProductsByPromotionId(promotionId: string) {
    const res = await this.repository.findAllProductByPromotionId(promotionId);
    return res.map(({ product }) => {
      return productEntity.toDto(product);
    });
  }

  async updatePromotion(id: string, updatePromotionDto: UpdatePromotionDto) {
    const exists = await this.repository.checkIfExists('id', id);
    if (!exists) throw new NotFoundException('Nenhuma promoção com este id');

    return await this.repository.update(id, updatePromotionDto);
  }

  async removePromotion(id: string) {
    const exists = await this.repository.checkIfExists('id', id);
    if (!exists) throw new NotFoundException('Nenhuma promoção com este id');

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
        throw new AlredyExistsException('Este produto já está em uma promoção');
    });

    return await this.repository.addPromotionProduct(product);
  }

  async removePromotionProduct(promotionId: string, productId: string) {
    const exists = this.repository.findProductOnPromotionById(
      promotionId,
      productId,
    );

    if (!exists)
      throw new NotFoundException(
        'Nenhum producto com esse id foi acho nessa promoção',
      );

    return await this.repository.removePromotionProductById(
      productId,
      promotionId,
    );
  }
}
