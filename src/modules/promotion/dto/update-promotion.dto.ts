import { PartialType } from '@nestjs/mapped-types';
import { PromotionEntity } from '../entities/promotion.entity';

export class UpdatePromotionDto extends PartialType(PromotionEntity) {}
