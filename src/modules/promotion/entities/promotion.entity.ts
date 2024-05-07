import { CreatePromotionDto } from './../dto/create-promotion.dto';
import { GetPromotionDto } from '../dto/get-promotion.dto';
import { PromotionProductEntity } from './Promotion-product.entity';
import { Promotion } from '@prisma/client';
import { productEntity } from 'src/modules/product/entitys/product.entity';

export class PromotionEntity implements Promotion {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  description: string;
  products: PromotionProductEntity[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(createPromotionDto: CreatePromotionDto) {
    return Object.assign(new PromotionEntity(), createPromotionDto);
  }

  public static toDto(promotion: PromotionEntity): GetPromotionDto {
    return {
      id: promotion.id,
      name: promotion.name,
      startAt: promotion.startAt,
      endAt: promotion.endAt,
      description: promotion.description,
      products: promotion.products.map(({ product }) => {
        return productEntity.toDto(product);
      }),
    };
  }
}
