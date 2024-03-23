import { randomUUID } from 'crypto';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from '@prisma/client';

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
}
