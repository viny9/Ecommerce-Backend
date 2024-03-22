import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositorys/user-repository';
import { ProductRepository } from './repositorys/product-repository';
import { CategoryRepository } from './repositorys/category.repository';
import { CartRepository } from './repositorys/cart.repository';

@Module({
  exports: [
    PrismaService,
    UserRepository,
    ProductRepository,
    CategoryRepository,
    CartRepository,
  ],
  providers: [
    PrismaService,
    UserRepository,
    ProductRepository,
    CategoryRepository,
    CartRepository,
  ],
})
export class DatabaseModule {}
