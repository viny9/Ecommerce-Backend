import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/database/repositorys/product-repository';
import { GetProductDto } from './dto/get-product.dto';
import { Products } from './product.entity';
import { GetCategoryDto } from 'src/category/dto/get-category.dto';
import { ImgDto } from './dto/img.dto';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepository) {}

  async create(createProductDto: CreateProductDto) {
    this.repository.save(createProductDto);
  }

  async findAll() {
    const products = await this.repository.findAll();

    return products.map((product: Products) => {
      const { id, name, price, imgs, category } = product;
      const imgDtoClass = ImgDto.prototype;
      const imgsDto = imgDtoClass.imgsDtoGenerate(imgs);
      const categoryDto = new GetCategoryDto(category.id, category.name);

      return new GetProductDto(id, name, price, imgsDto, categoryDto);
    });
  }

  async findOne(id: string) {
    const product = await this.repository.findById(id);

    const imgDtoClass = ImgDto.prototype;
    const imgsDto = imgDtoClass.imgsDtoGenerate(product.imgs);

    const categoryDto = new GetCategoryDto(
      product.category.id,
      product.category.name,
    );

    return new GetProductDto(
      product.id,
      product.name,
      product.price,
      imgsDto,
      categoryDto,
    );
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.repository.update(id, updateProductDto);

    const imgDtoClass = ImgDto.prototype;
    const imgsDto = imgDtoClass.imgsDtoGenerate(updateProductDto.imgs);

    const categoryDto = new GetCategoryDto(
      updatedProduct.category.id,
      updatedProduct.category.name,
    );

    return new GetProductDto(
      updatedProduct.id,
      updatedProduct.name,
      updatedProduct.price,
      imgsDto,
      categoryDto,
    );
  }

  async remove(id: string) {
    return await this.repository.delete(id);
  }
}
