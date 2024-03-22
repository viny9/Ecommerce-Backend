import { Injectable } from '@nestjs/common';
import { UpdateListDto } from './dto/update-list.dto';
import { ImgDto } from 'src/product/dto/img.dto';
import { GetCategoryDto } from 'src/category/dto/get-category.dto';
import { GetProductDto } from 'src/product/dto/get-product.dto';
import { GetListDto } from './dto/get-list.dto';
import { ListRepository } from 'src/database/repositorys/list.repository';

@Injectable()
export class ListService {
  constructor(private repository: ListRepository) {}

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: string) {
    const list = await this.repository.findListByUserId(id);

    const products = list.products.map((product) => {
      const { id, name, price, imgs, category } = product.product;
      const imgsDtoClass = ImgDto.prototype;
      const imgsDto = imgsDtoClass.imgsDtoGenerate(imgs);

      const categoryDto = new GetCategoryDto(category.id, category.name);

      return new GetProductDto(id, name, price, imgsDto, categoryDto);
    });

    return new GetListDto(list.id, list.userId, products);
  }

  async addItemInList(id: string, updateListDto: UpdateListDto) {
    const listItem = await this.repository.addListItem(id, updateListDto);

    const products = listItem.products.map((product) => {
      const { id, name, price, imgs, category } = product.product;
      const imgsDtoClass = ImgDto.prototype;
      const imgsDto = imgsDtoClass.imgsDtoGenerate(imgs);

      const categoryDto = new GetCategoryDto(category.id, category.name);

      return new GetProductDto(id, name, price, imgsDto, categoryDto);
    });

    return new GetListDto(listItem.id, listItem.userId, products);
  }

  async removeItemFromList(id: string, updateListDto: UpdateListDto) {
    const list = await this.repository.removeListItem(id, updateListDto);

    const products = list.products.map((product) => {
      const { id, name, price, imgs, category } = product.product;
      const imgsDtoClass = ImgDto.prototype;
      const imgsDto = imgsDtoClass.imgsDtoGenerate(imgs);

      const categoryDto = new GetCategoryDto(category.id, category.name);

      return new GetProductDto(id, name, price, imgsDto, categoryDto);
    });

    return new GetListDto(list.id, list.userId, products);
  }
}
