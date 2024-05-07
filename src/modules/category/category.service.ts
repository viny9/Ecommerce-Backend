import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from 'src/database/repositorys/category.repository';
import { GetCategoryDto } from './dto/get-category.dto';
import { CategoryEntity } from './entitys/category.entity';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private repository: CategoryRepository) {}

  async addCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<GetCategoryDto> {
    const exists: boolean = await this.repository.checkIfExists(
      'name',
      createCategoryDto.name,
    );

    if (exists)
      throw new BadRequestException('Já há uma categoria com esse nome');

    const category = CategoryEntity.toEntity(createCategoryDto.name);
    const res: Category = await this.repository.save(category);
    return CategoryEntity.toDto(res);
  }

  async findAllCategorys(): Promise<GetCategoryDto[]> {
    const categorys: Category[] = await this.repository.findAll();

    return categorys.map((category) => {
      return CategoryEntity.toDto(category);
    });
  }

  async findCategoryById(id: string): Promise<GetCategoryDto> {
    const category: Category = await this.repository.findById(id);
    if (!category)
      throw new Error('Nenhuma categoria foi encontrada com esse id');

    return CategoryEntity.toDto(category);
  }

  async updateCategoryById(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<GetCategoryDto> {
    const exists: boolean = await this.repository.checkIfExists('id', id);
    if (!exists)
      throw new Error('Nenhuma categoria foi encontrada com esse id');

    const category: Category = await this.repository.update(
      id,
      updateCategoryDto,
    );

    return CategoryEntity.toDto(category);
  }

  async removeCategoryById(id: string): Promise<GetCategoryDto> {
    const exists: boolean = await this.repository.checkIfExists('id', id);
    if (!exists)
      throw new Error('Nenhuma categoria foi encontrada com esse id');

    const category: Category = await this.repository.delete(id);
    return CategoryEntity.toDto(category);
  }
}
