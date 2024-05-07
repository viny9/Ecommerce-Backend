import { Category } from '@prisma/client';
import Repository from './abstract.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'category');
  }

  async findByCategoryName(name: string): Promise<Category> {
    return await this.prisma.category.findUnique({
      where: { name },
    });
  }
}
