import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from 'src/database/repositorys/category.repository';
import { GetCategoryDto } from './dto/get-category.dto';
import { Categorys } from './entitys/category.entity';

@Injectable()
export class CategoryService {
  constructor(private repository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<GetCategoryDto> {
    const category = new Categorys(createCategoryDto);
    const res: Categorys = await this.repository.save(category);
    return new GetCategoryDto(res.id, res.name);
  }

  async findAll(): Promise<GetCategoryDto[]> {
    const categorys: Categorys[] = await this.repository.findAll();

    return categorys.map((category) => {
      return new GetCategoryDto(category.id, category.name);
    });
  }

  async findOne(id: string): Promise<GetCategoryDto> {
    const category = await this.repository.findById(id);
    return new GetCategoryDto(category.id, category.name);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<GetCategoryDto> {
    const category: Categorys = await this.repository.update(
      id,
      updateCategoryDto,
    );

    return new GetCategoryDto(category.id, category.name);
  }

  async remove(id: string): Promise<GetCategoryDto> {
    const category: Categorys = await this.repository.delete(id);
    return new GetCategoryDto(category.id, category.name);
  }
}
