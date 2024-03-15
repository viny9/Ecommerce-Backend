import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositorys/user-repository';
import { ProductRepository } from './repositorys/product-repository';
import { CategoryRepository } from './repositorys/category.repository';

@Module({
  exports: [
    PrismaService,
    UserRepository,
    ProductRepository,
    CategoryRepository,
  ],
  providers: [
    PrismaService,
    UserRepository,
    ProductRepository,
    CategoryRepository,
  ],
})
export class DatabaseModule {}
