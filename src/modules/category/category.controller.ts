import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IsAdmin } from 'src/shared/decorators/is-admin.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @IsAdmin()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.addCategory(createCategoryDto);
  }

  @Get()
  getAllCategorys() {
    return this.categoryService.findAllCategorys();
  }

  @Get(':id')
  getCategory(@Param('id') id: string) {
    return this.categoryService.findCategoryById(id);
  }

  @Patch(':id')
  @IsAdmin()
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategoryById(id, updateCategoryDto);
  }

  @Delete(':id')
  @IsAdmin()
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.removeCategoryById(id);
  }
}
