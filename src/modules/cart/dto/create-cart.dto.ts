import { CartItem } from '@prisma/client';
import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  userId: string;

  @IsEmpty()
  products: CartItem[];
}
