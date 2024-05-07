import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/database/repositorys/product-repository';
import { productEntity } from './entitys/product.entity';
import { AlredyExistsException } from 'src/shared/exceptions/AlredyExistsException';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepository) {}

  async newProduct(createProductDto: CreateProductDto) {
    const exists = await this.repository.checkIfExists(
      'name',
      createProductDto.name,
    );

    if (exists)
      throw new AlredyExistsException('Produto com esse nome já existe');

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
    if (!product)
      throw new NotFoundException('Nenhum produto com esse id foi encontrado');

    return productEntity.toDto(product);
  }

  async updateProductById(id: string, updateProductDto: UpdateProductDto) {
    const exists = await this.repository.checkIfExists('id', id);
    if (!exists)
      throw new NotFoundException('Nenhum produto com esse id foi encontrado');

    const updatedProduct = await this.repository.update(id, updateProductDto);
    return productEntity.toDto(updatedProduct);
  }

  async removeProduct(id: string) {
    const exists = await this.repository.checkIfExists('id', id);
    if (!exists)
      throw new NotFoundException('Nenhum produto com esse id foi encontrado');

    const product = await this.repository.delete(id);
    return productEntity.toDto(product);
  }
}
