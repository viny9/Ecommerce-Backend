import { List } from '@prisma/client';
import { GetListDto } from '../dto/get-list.dto';
import { ListItemEntity } from './list-item.entity';
import { productEntity } from 'src/modules/product/entitys/product.entity';

export class ListEntity implements List {
  id: string;
  userId: string;
  products: ListItemEntity[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(listId: string, userId: string): ListEntity {
    return Object.assign(new ListEntity(), { listId, userId });
  }

  public static toDto(list: ListEntity): GetListDto {
    return {
      id: list.id,
      userId: list.userId,
      products: list.products.map((listItem) =>
        productEntity.toDto(listItem.product),
      ),
    };
  }
}
