import { GetCategoryDto } from '../dto/get-category.dto';
import { Category } from '@prisma/client';

export class CategoryEntity implements Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(name: string): CategoryEntity {
    return Object.assign(new CategoryEntity(), { name });
  }

  public static toDto(category: CategoryEntity): GetCategoryDto {
    return {
      id: category.id,
      name: category.name,
    };
  }
}
