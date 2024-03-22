import { List } from '@prisma/client';
import Repository from './abstract.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateListDto } from 'src/list/dto/update-list.dto';

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
              },
            },
          },
        },
      },
    });
  }

  async addListItem(listId: string, data: UpdateListDto) {
    return await this.prisma.list.update({
      where: {
        id: listId,
      },
      data: {
        products: {
          create: {
            product: {
              connect: {
                id: data.productId,
              },
            },
          },
        },
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                imgs: true,
                category: true,
              },
            },
          },
        },
      },
    });
  }

  async removeListItem(listId: string, data: UpdateListDto) {
    return await this.prisma.list.update({
      where: {
        id: listId,
      },
      data: {
        products: {
          delete: {
            productId_listId: {
              productId: data.productId,
              listId: listId,
            },
          },
        },
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                imgs: true,
                category: true,
              },
            },
          },
        },
      },
    });
  }
}
