import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './database/prisma.service';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, DatabaseModule, ProductModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
