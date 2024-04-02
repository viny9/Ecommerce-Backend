import { Injectable } from '@nestjs/common';
import { UpdateListDto } from './dto/update-list.dto';
import { ListRepository } from 'src/database/repositorys/list.repository';
import { Lists } from './entitys/list.entity';

@Injectable()
export class ListService {
  constructor(private repository: ListRepository) {}

  async findOne(id: string) {
    const list = await this.repository.findListByUserId(id);
    return Lists.toListDto(list);
  }

  async addItemInList(id: string, updateListDto: UpdateListDto) {
    const listItem = await this.repository.addListItem(id, updateListDto);
    return Lists.toListDto(listItem);
  }

  async removeItemFromList(id: string, updateListDto: UpdateListDto) {
    const list = await this.repository.removeListItem(id, updateListDto);
    return Lists.toListDto(list);
  }
}
