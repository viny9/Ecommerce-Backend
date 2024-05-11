import { Address } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import Repository from './abstract.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressRepository extends Repository<Address> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'address');
  }

  async findAddressByUserId(userId: string) {
    return await this.prisma.address.findUnique({
      where: { userId },
    });
  }
}
