import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import Repository from './abstract.repository';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'user');
  }
}
