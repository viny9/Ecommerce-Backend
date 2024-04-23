import { PromotionProduct } from '@prisma/client';

export class getPromotionDto {
  id: string;
  name: string;
  percentage: number;
  startAt: Date;
  endAt: Date;
  description: string;
  products: PromotionProduct[];
}
