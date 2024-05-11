import { Injectable, NotFoundException } from '@nestjs/common';
import { ListRepository } from 'src/database/repositorys/list.repository';
import { ListEntity } from './entitys/list.entity';
import { ProductEntity } from 'src/modules/product/entitys/product.entity';
import { AlredyExistsException } from 'src/shared/exceptions/AlredyExistsException';

@Injectable()
export class ListService {
  constructor(private repository: ListRepository) {}

  async findListByUserId(id: string) {
    const list = await this.repository.findListByUserId(id);
    if (!list) throw new NotFoundException('Unable to find user with this id');

    return ListEntity.toDto(list);
  }

  async addItemInList(id: string, productId: string) {
    const alredyInList = await this.repository.findItemOnListById(
      id,
      productId,
    );
    if (alredyInList) throw new AlredyExistsException('Product alredy in list');

    const listItem = await this.repository.addListItem(id, productId);
    return ProductEntity.toDto(listItem.product);
  }

  async removeItemFromList(id: string, productId: string) {
    const alredyInList = await this.repository.findItemOnListById(
      id,
      productId,
    );
    if (!alredyInList)
      throw new NotFoundException(
        'Unable to find product with this id on list',
      );

    const listItem = await this.repository.removeListItem(id, productId);
    return ProductEntity.toDto(listItem.product);
  }
}
