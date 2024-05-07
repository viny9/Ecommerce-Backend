import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import Repository from './abstract.repository';

@Injectable()
export class UserRepository extends Repository<User, Prisma.UserInclude> {
  constructor(protected prisma: PrismaService) {
    const includes: Prisma.UserInclude = {
      address: true,
    };
    super(prisma, 'user', includes);
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      include: {
        address: true,
      },
    });
  }
}
