import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/database/repositorys/product.repository';
import { ProductEntity } from './entitys/product.entity';
import { AlredyExistsException } from 'src/shared/exceptions/AlredyExistsException';
import { ImgService } from '../img/img.service';

@Injectable()
export class ProductService {
  constructor(
    private repository: ProductRepository,
    private imgService: ImgService,
  ) {}

  async newProduct(createProductDto: CreateProductDto) {
    const exists = await this.repository.checkIfExists(
      'name',
      createProductDto.name,
    );

    if (exists) throw new AlredyExistsException('Product alredy exists');

    const products = ProductEntity.toEntity(createProductDto);
    delete products.imgs;

    const res = await this.repository.save(products);
    return ProductEntity.toDto(res);
  }

  async findAllProducts() {
    const products = await this.repository.findAll();

    return products.map((product) => {
      return ProductEntity.toDto(product);
    });
  }

  async findProductById(id: string) {
    const product = await this.repository.findById(id);
    if (!product)
      throw new NotFoundException('Unable to find product with this id');

    return ProductEntity.toDto(product);
  }

  async updateProductById(id: string, updateProductDto: UpdateProductDto) {
    const exists = await this.repository.checkIfExists('id', id);
    if (!exists)
      throw new NotFoundException('Unable to find product with this id');

    const updatedProduct = await this.repository.update(id, updateProductDto);

    return ProductEntity.toDto(updatedProduct);
  }

  async removeProduct(id: string) {
    const product: ProductEntity = await this.repository.findById(id);

    if (!product)
      throw new NotFoundException('Unable to find product with this id');

    if (product.imgs)
      await this.imgService.removeAllImgsFromProduct(product.id);

    await this.repository.delete(id);

    return ProductEntity.toDto(product);
  }
}
