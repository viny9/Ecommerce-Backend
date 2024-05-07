import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  addNewCard(@Body() createCardDto: CreateCardDto) {
    return this.cardService.addCardToUser(createCardDto);
  }

  @Get(':id')
  findCard(@Param('id') id: string) {
    return this.cardService.findCardById(id);
  }

  @Get('user/:id')
  findUserCard(@Param('id') id: string) {
    return this.cardService.findCardByUserId(id);
  }

  @Patch(':id')
  updateCard(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.updateCardById(id, updateCardDto);
  }

  @Delete(':id')
  removeCard(@Param('id') id: string) {
    return this.cardService.removeCardById(id);
  }
}
