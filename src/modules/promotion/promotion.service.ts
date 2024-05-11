import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionRepository } from 'src/database/repositorys/promotion.repository';
import { PromotionProductDto } from './dto/promotion-product.dto';
import { PromotionEntity } from './entities/promotion.entity';
import { PromotionProductEntity } from './entities/Promotion-product.entity';
import { AlredyExistsException } from 'src/shared/exceptions/AlredyExistsException';
import { ProductEntity } from '../product/entitys/product.entity';

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
      return ProductEntity.toDto(product);
    });
  }

  async updatePromotion(id: string, updatePromotionDto: UpdatePromotionDto) {
    const exists = await this.repository.checkIfExists('id', id);
    if (!exists) throw new NotFoundException('Nenhuma promoção com este id');

    const res = await this.repository.update(id, updatePromotionDto);
    return PromotionEntity.toDto(res);
  }

  async removePromotion(id: string) {
    const exists = await this.repository.checkIfExists('id', id);
    if (!exists) throw new NotFoundException('Nenhuma promoção com este id');

    const res = await this.repository.delete(id);
    return PromotionEntity.toDto(res);
  }

  async addPromotionProduct(
    promotionId: string,
    promotionProduct: PromotionProductDto | PromotionProductDto[],
  ) {
    if (!Array.isArray(promotionProduct)) {
      promotionProduct = [promotionProduct];
    }

    await Promise.all(
      promotionProduct.map(async (product) => {
        const exists = await this.repository.findProductOnPromotionById(
          promotionId,
          product.productId,
        );

        if (exists)
          throw new AlredyExistsException(
            `Product ${product.productId} alredy in promotion`,
          );
      }),
    );

    const product = PromotionProductEntity.toEntityArray(
      promotionId,
      promotionProduct,
    );

    return await this.repository.addPromotionProduct(product);
  }

  async removePromotionProduct(promotionId: string, products: string[]) {
    await Promise.all(
      products.map(async (id) => {
        const exists = await this.repository.findProductOnPromotionById(
          promotionId,
          id,
        );

        if (!exists)
          throw new AlredyExistsException(`Unable to find ${id} in promotion`);
      }),
    );

    return products.map(async (productId) => {
      const res = await this.repository.removePromotionProductById(
        productId,
        promotionId,
      );

      return ProductEntity.toDto(res.product);
    });
  }
}
