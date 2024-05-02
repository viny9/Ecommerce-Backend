import { PromotionProduct } from '@prisma/client';

export class getPromotionDto {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  description: string;
  products: PromotionProduct[];
}
