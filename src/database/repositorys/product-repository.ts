import { Product } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Products } from 'src/product/entitys/product.entity';
import { randomUUID } from 'crypto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import Repository from './abstract.repository';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'product');
  }

  async save(data: Products): Promise<Products> {
    return await this.prisma.product.create({
      data: {
        id: randomUUID(),
        name: data.name,
        price: data.price,
        imgs: {},
        categoryId: data.categoryId,
      },
      include: {
        category: true,
        imgs: true,
      },
    });
  }

  async findAll(): Promise<Products[]> {
    return await this.prisma.product.findMany({
      include: {
        imgs: true,
        category: true,
      },
    });
  }

  async findById(id: string): Promise<Products> {
    return await this.prisma.product.findUnique({
      where: { id },
      include: {
        imgs: true,
        category: true,
      },
    });
  }

  async update(id: string, data: UpdateProductDto): Promise<Products> {
    return await this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        imgs: {}, // Update imgs later
        category: {
          connect: {
            id: data.categoryId,
          },
        },
      },
      include: {
        category: true,
        imgs: true,
      },
    });
  }

  async delete(id: string): Promise<Products> {
    return this.prisma.product.delete({
      where: { id },
      include: {
        category: true,
        imgs: true,
      },
    });
  }
}
