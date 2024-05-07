import { Card } from '@prisma/client';
import { GetCardDto } from '../dto/get-card.dto';
import { CreateCardDto } from '../dto/create-card.dto';

export class Cards implements Card {
  id: string;
  lastFourNumber: number;
  expMounth: number;
  expYear: number;
  brand: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(createCardDto: CreateCardDto): Cards {
    return Object.assign(new Cards(), createCardDto);
  }

  public static toCardDto(card: Card): GetCardDto {
    return {
      id: card.id,
      brand: card.brand,
      lastFourNumber: card.lastFourNumber,
      expMounth: card.expMounth,
      expYear: card.expYear,
    };
  }
}
