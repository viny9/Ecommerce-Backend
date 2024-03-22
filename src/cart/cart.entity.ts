import { Cart, CartItem } from '@prisma/client';

export class Carts implements Cart {
  id: string;
  userId: string;
  orderId: string;
  products: CartItem[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
