import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './database/prisma.service';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { ListModule } from './list/list.module';
import { CardModule } from './card/card.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ProductModule,
    CategoryModule,
    CartModule,
    ListModule,
    CardModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
