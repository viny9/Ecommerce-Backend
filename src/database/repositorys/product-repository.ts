import { Product } from '@prisma/client';
import Repository from './abstract.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'product');
  }
}
