import { List } from '@prisma/client';
import { GetListDto } from '../dto/get-list.dto';
import { ListItems } from './list-item.entity';
import { Products } from 'src/modules/product/entitys/product.entity';

export class Lists implements List {
  id: string;
  userId: string;
  products: ListItems[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(listId: string, userId: string): Lists {
    return Object.assign(new Lists(), { listId, userId });
  }

  public static toListDto(list: Lists): GetListDto {
    return {
      id: list.id,
      userId: list.userId,
      products: list.products.map((listItem) =>
        Products.toProductDto(listItem.product),
      ),
    };
  }
}
