import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { ListService } from './list.service';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne(id);
  }

  @Put(':id')
  addProductInList(
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
  ) {
    return this.listService.addItemInList(id, updateListDto);
  }

  @Put(':id/remove')
  removeProductFormList(
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
  ) {
    return this.listService.removeItemFromList(id, updateListDto);
  }
}
