import { randomUUID } from 'crypto';
import { CreatePromotionDto } from '../dto/create-promotion.dto';
import { getPromotionDto } from '../dto/get-promotion.dto';
import { PromotionsProducts } from './PromotionProduct.entity';

export class Promotion {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  description: string;
  products: PromotionsProducts[];

  constructor(createPromotionDto: CreatePromotionDto) {
    this.id = randomUUID();
    this.name = createPromotionDto.name;
    this.startAt = createPromotionDto.startAt;
    this.endAt = createPromotionDto.endAt;
    this.description = createPromotionDto.description;
  }

  public static toDto(promotion: Promotion): getPromotionDto {
    return {
      id: promotion.id,
      name: promotion.name,
      startAt: promotion.startAt,
      endAt: promotion.endAt,
      description: promotion.description,
      products: promotion.products,
    };
  }
}
