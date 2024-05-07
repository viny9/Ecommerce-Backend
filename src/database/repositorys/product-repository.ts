import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import Repository from './abstract.repository';

@Injectable()
export class ProductRepository extends Repository<
  Product,
  Prisma.ProductInclude
> {
  constructor(protected prisma: PrismaService) {
    const includes: Prisma.ProductInclude = {
      imgs: true,
      category: true,
      promotionProduct: true,
    };

    super(prisma, 'product', includes);
  }
}
