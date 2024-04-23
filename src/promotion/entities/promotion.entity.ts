import { CreatePromotionDto } from '../dto/create-promotion.dto';
import { getPromotionDto } from '../dto/get-promotion.dto';
import { PromotionsProducts } from './PromotionProduct.entity';

export class Promotion {
  id: string;
  name: string;
  percentage: number;
  startAt: Date;
  endAt: Date;
  description: string;
  products: PromotionsProducts[];

  constructor(createPromotionDto: CreatePromotionDto) {
    this.id = createPromotionDto.id;
    this.name = createPromotionDto.name;
    this.percentage = createPromotionDto.percentage;
    this.startAt = createPromotionDto.startAt;
    this.endAt = createPromotionDto.endAt;
    this.description = createPromotionDto.description;
  }

  public static toDto(promotion: Promotion): getPromotionDto {
    return {
      id: promotion.id,
      name: promotion.name,
      percentage: promotion.percentage,
      startAt: promotion.startAt,
      endAt: promotion.endAt,
      description: promotion.description,
      products: promotion.products,
    };
  }
}
