import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositorys/user-repository';
import { ProductRepository } from './repositorys/product-repository';

@Module({
  exports: [PrismaService, UserRepository, ProductRepository],
  providers: [PrismaService, UserRepository, ProductRepository],
})
export class DatabaseModule {}
