import { ListItem } from '@prisma/client';
import { ProductEntity } from 'src/modules/product/entitys/product.entity';

export class ListItemEntity implements ListItem {
  productId: string;
  product?: ProductEntity;
  listId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date = undefined;

  public static toEntity(productId: string, listId: string): ListItemEntity {
    return Object.assign(new ListItemEntity(), {
      productId,
      listId,
    });
  }
}
