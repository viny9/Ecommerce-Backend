import { ListItem } from '@prisma/client';
import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  userId: string;

  @IsEmpty()
  products: ListItem[];
}
