import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositorys/user-repository';

@Module({
  providers: [PrismaService, UserRepository],
})
export class DatabaseModule {}
