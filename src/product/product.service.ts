import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/database/repositorys/product-repository';
import { Products } from './entitys/product.entity';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepository) {}

  async create(createProductDto: CreateProductDto) {
    const products = new Products(createProductDto);
    this.repository.save(products);
  }

  async findAll() {
    const products = await this.repository.findAll();

    return products.map((product: Products) => {
      return Products.toProductDto(product);
    });
  }

  async findOne(id: string) {
    const product = await this.repository.findById(id);
    return Products.toProductDto(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.repository.update(id, updateProductDto);
    return Products.toProductDto(updatedProduct);
  }

  async remove(id: string) {
    const product = await this.repository.delete(id);
    return Products.toProductDto(product);
  }
}
