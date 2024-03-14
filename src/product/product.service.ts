import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/database/repositorys/product-repository';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepository) {}

  async create(createProductDto: CreateProductDto) {
    this.repository.save(createProductDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: string) {
    return await this.repository.findById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.repository.update(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.repository.delete(id);
  }
}
