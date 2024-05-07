import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/database/repositorys/product-repository';
import { productEntity } from './entitys/product.entity';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepository) {}

  async newProduct(createProductDto: CreateProductDto) {
    const products = productEntity.toEntity(createProductDto);
    this.repository.save(products);
  }

  async findAllProducts() {
    const products = await this.repository.findAll();

    return products.map((product: productEntity) => {
      return productEntity.toDto(product);
    });
  }

  async findProductById(id: string) {
    const product = await this.repository.findById(id);
    return productEntity.toDto(product);
  }

  async updateProductById(id: string, updateProductDto: UpdateProductDto) {
    const productExists = await this.repository.findById(id);
    if (!productExists) return null;

    const updatedProduct = await this.repository.update(id, updateProductDto);
    return productEntity.toDto(updatedProduct);
  }

  async removeProduct(id: string) {
    const productExists = await this.repository.findById(id);
    if (!productExists) return null;

    const product = await this.repository.delete(id);
    return productEntity.toDto(product);
  }
}
