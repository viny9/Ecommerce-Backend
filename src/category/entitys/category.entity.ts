import { Category } from '@prisma/client';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { randomUUID } from 'crypto';

export class Categorys implements Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(createCategoryDto: CreateCategoryDto) {
    this.id = randomUUID();
    this.name = createCategoryDto.name;
  }
}
