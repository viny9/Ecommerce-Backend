import { ListItem } from '@prisma/client';
import { Products } from 'src/product/entitys/product.entity';

export class ListItems implements ListItem {
  productId: string;
  product: Products;
  listId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
