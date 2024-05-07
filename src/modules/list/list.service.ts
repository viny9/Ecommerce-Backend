import { Injectable, NotFoundException } from '@nestjs/common';
import { ListRepository } from 'src/database/repositorys/list.repository';
import { Lists } from './entitys/list.entity';
import { Products } from 'src/modules/product/entitys/product.entity';

@Injectable()
export class ListService {
  constructor(private repository: ListRepository) {}

  async findOne(id: string) {
    const list = await this.repository.findListByUserId(id);
    if (!list)
      throw new NotFoundException('Nenhum usuário com esse id encontrado');

    return Lists.toListDto(list);
  }

  async addItemInList(id: string, productId: string) {
    const alredyInList = await this.repository.findItemOnListById(
      id,
      productId,
    );
    if (alredyInList) throw new Error('Já está na lista');

    const listItem = await this.repository.addListItem(id, productId);
    return Products.toProductDto(listItem.product);
  }

  async removeItemFromList(id: string, productId: string) {
    const alredyInList = await this.repository.findItemOnListById(
      id,
      productId,
    );
    if (!alredyInList)
      throw new NotFoundException('Não há produto na lista com esse id');

    const listItem = await this.repository.removeListItem(id, productId);
    return Products.toProductDto(listItem.product);
  }
}
