import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositorys/user.repository';
import { ProductRepository } from './repositorys/product.repository';
import { CategoryRepository } from './repositorys/category.repository';
import { CartRepository } from './repositorys/cart.repository';
import { ListRepository } from './repositorys/list.repository';
import { CardRepository } from './repositorys/card.repository';
import { OrderRepository } from './repositorys/order.repository';
import { PromotionRepository } from './repositorys/promotion.repository';
import { AddressRepository } from './repositorys/address.repository';

@Module({
  exports: [
    PrismaService,
    UserRepository,
    ProductRepository,
    CategoryRepository,
    CartRepository,
    ListRepository,
    CardRepository,
    OrderRepository,
    PromotionRepository,
    AddressRepository,
  ],
  providers: [
    PrismaService,
    UserRepository,
    ProductRepository,
    CategoryRepository,
    CartRepository,
    ListRepository,
    CardRepository,
    OrderRepository,
    PromotionRepository,
    AddressRepository,
  ],
})
export class DatabaseModule {}
