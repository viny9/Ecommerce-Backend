import { Card } from '@prisma/client';
import { GetCardDto } from '../dto/get-card.dto';
import { CreateCardDto } from '../dto/create-card.dto';

export class CardEntity implements Card {
  id: string;
  lastFourNumber: number;
  expMounth: number;
  expYear: number;
  brand: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(createCardDto: CreateCardDto): CardEntity {
    return Object.assign(new CardEntity(), createCardDto);
  }

  public static toDto(card: Card): GetCardDto {
    return {
      id: card.id,
      brand: card.brand,
      lastFourNumber: card.lastFourNumber,
      expMounth: card.expMounth,
      expYear: card.expYear,
    };
  }
}
