import { Injectable } from '@nestjs/common';
import Repository from './abstract.repository';
import { Card } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CardRepository extends Repository<Card> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'card');
  }
}
