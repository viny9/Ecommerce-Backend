import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import Repository from './abstract.repository';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'user');
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
}
