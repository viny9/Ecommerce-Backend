import { randomUUID } from 'crypto';
import { CreateProductDto } from './dto/create-product.dto';
import { Category, Product, ProductImg } from '@prisma/client';

export class Products implements Product {
  id: string;
  name: string;
  price: string;
  imgs?: ProductImg[];
  categoryId: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(createProductDto: CreateProductDto) {
    this.id = randomUUID();
    this.name = createProductDto.name;
    this.price = createProductDto.price;
  }
}
