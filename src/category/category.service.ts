import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from 'src/database/repositorys/category.repository';

@Injectable()
export class CategoryService {
  constructor(private repository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.repository.save(createCategoryDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: string) {
    return await this.repository.findById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.repository.update(id, updateCategoryDto);
  }

  async remove(id: string) {
    return await this.repository.delete(id);
  }
}
