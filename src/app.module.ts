import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './database/prisma.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
