import { ListItem } from '@prisma/client';
import { Products } from 'src/product/entitys/product.entity';

export class ListItems implements ListItem {
  productId: string;
  product?: Products;
  listId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date = undefined;

  public static toEntity(productId: string, listId: string): ListItems {
    return Object.assign(new ListItems(), {
      productId,
      listId,
      createdAt: new Date(),
      updatedAt: undefined,
    });
  }
}
