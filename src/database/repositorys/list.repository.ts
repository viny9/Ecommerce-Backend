import { List, Prisma } from '@prisma/client';
import Repository from './abstract.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { ListItemEntity } from 'src/modules/list/entitys/list-item.entity';

@Injectable()
export class ListRepository extends Repository<List, Prisma.ListInclude> {
  constructor(protected prisma: PrismaService) {
    const includes: Prisma.ListInclude = {
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
    };
    super(prisma, 'list', includes);
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

  async findItemOnListById(
    listId: string,
    itemId: string,
  ): Promise<ListItemEntity> {
    return await this.prisma.listItem.findUnique({
      where: {
        productId_listId: {
          listId,
          productId: itemId,
        },
      },
    });
  }

  async addListItem(
    listId: string,
    productId: string,
  ): Promise<ListItemEntity> {
    return await this.prisma.listItem.create({
      data: {
        listId: listId,
        productId: productId,
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

  async removeListItem(
    listId: string,
    productId: string,
  ): Promise<ListItemEntity> {
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
