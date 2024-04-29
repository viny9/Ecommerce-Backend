import { randomUUID } from 'crypto';
import { CreateCardDto } from '../dto/create-card.dto';
import { Card } from '@prisma/client';
import { GetCardDto } from '../dto/get-card.dto';

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

  constructor(createCardDto: CreateCardDto) {
    this.id = randomUUID();
    this.userId = createCardDto.userId;
    this.lastFourNumber = createCardDto.lastFourNumber;
    this.expMounth = createCardDto.expMounth;
    this.expYear = createCardDto.expYear;
    this.brand = createCardDto.brand;
  }

  static toCardDto(card: Card): GetCardDto {
    console.log(card);
    return {
      id: card.id,
      brand: card.brand,
      lastFourNumber: card.lastFourNumber,
      expMounth: card.expMounth,
      expYear: card.expYear,
    };
  }
}
