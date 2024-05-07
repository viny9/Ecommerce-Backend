import { Controller, Get, Param, Delete, Post } from '@nestjs/common';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get(':id')
  async getList(@Param('id') id: string) {
    return await this.listService.findListByUserId(id);
  }

  @Post(':id/product/:productId')
  async addProductInList(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return await this.listService.addItemInList(id, productId);
  }

  @Delete(':id/remove/:productId')
  async removeProductFormList(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return await this.listService.removeItemFromList(id, productId);
  }
}
