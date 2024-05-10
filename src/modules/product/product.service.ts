import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/database/repositorys/product-repository';
import { ProductEntity } from './entitys/product.entity';
import { AlredyExistsException } from 'src/shared/exceptions/AlredyExistsException';
import { ImgEntity } from './entitys/Img.entity';
import { ImgDto } from './dto/img.dto';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepository) {}

  async newProduct(createProductDto: CreateProductDto) {
    const exists = await this.repository.checkIfExists(
      'name',
      createProductDto.name,
    );

    if (exists) throw new AlredyExistsException('Product alredy exists');

    const products = ProductEntity.toEntity(createProductDto);
    delete products.imgs;

    const res = await this.repository.save(products);

    if (createProductDto.imgs.length > 0) {
      const imgs = ImgEntity.toEntityArray(createProductDto.imgs, res.id);
      await this.repository.addProductImgs(imgs);
    }
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
      throw new NotFoundException('Nenhum produto com esse id foi encontrado');

    return ProductEntity.toDto(product);
  }

  async updateProductById(id: string, updateProductDto: UpdateProductDto) {
    const exists = await this.repository.checkIfExists('id', id);
    if (!exists)
      throw new NotFoundException('Nenhum produto com esse id foi encontrado');

    if (updateProductDto.imgs)
      await this.addImgsToProduct(id, updateProductDto.imgs);

    if (updateProductDto.removedImgs)
      await this.removeProductImgs(id, updateProductDto.removedImgs);

    delete updateProductDto.imgs;
    delete updateProductDto.removedImgs;
    const updatedProduct = await this.repository.update(id, updateProductDto);

    return ProductEntity.toDto(updatedProduct);
  }

  private async addImgsToProduct(productId: string, newImgs: ImgDto[]) {
    const imgs = ImgEntity.toEntityArray(newImgs, productId);
    await this.repository.addProductImgs(imgs);
  }

  private async removeProductImgs(productId: string, removedImgs?: ImgDto[]) {
    const imgsToRemove = ImgEntity.toEntityArray(removedImgs, productId);
    await this.repository.deleteImgsFromProduct(imgsToRemove);
  }

  async removeProduct(id: string) {
    const exists = await this.repository.checkIfExists('id', id);
    if (!exists)
      throw new NotFoundException('Nenhum produto com esse id foi encontrado');

    const product: ProductEntity = await this.repository.delete(id);
    if (product.imgs)
      await this.repository.deleteAllImgsFromProduct(product.id);

    return ProductEntity.toDto(product);
  }
}
