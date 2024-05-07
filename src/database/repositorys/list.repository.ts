import { List } from '@prisma/client';
import Repository from './abstract.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { ListItems } from 'src/list/entitys/list-item.entity';

@Injectable()
export class ListRepository extends Repository<List> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'list');
  }

  async findListByUserId(id: string) {
    return await this.prisma.list.findUnique({
      where: {
        userId: id,
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                imgs: true,
                category: true,
                promotionProduct: true,
              },
            },
          },
        },
      },
    });
  }

  async findItemOnListById(listId: string, itemId: string): Promise<ListItems> {
    return await this.prisma.listItem.findUnique({
      where: {
        productId_listId: {
          listId,
          productId: itemId,
        },
      },
    });
  }

  async addListItem(listId: string, productId: string): Promise<ListItems> {
    return await this.prisma.listItem.create({
      data: {
        productId,
        listId,
      },
      include: {
        product: {
          include: {
            imgs: true,
            category: true,
            promotionProduct: true,
          },
        },
      },
    });
  }

  async removeListItem(listId: string, productId: string): Promise<ListItems> {
    return this.prisma.listItem.delete({
      where: { productId_listId: { productId, listId } },
      include: {
        product: {
          include: {
            imgs: true,
            category: true,
            promotionProduct: true,
          },
        },
      },
    });
  }
}
