import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardRepository } from 'src/database/repositorys/card.repository';
import { GetCardDto } from './dto/get-card.dto';
import { CardEntity } from './entitys/card.entity';
import { Card } from '@prisma/client';
import { AlredyExistsException } from 'src/shared/exceptions/AlredyExistsException';

@Injectable()
export class CardService {
  constructor(private repository: CardRepository) {}

  async addCardToUser(createCardDto: CreateCardDto): Promise<GetCardDto> {
    const exists = await this.repository.checkIfExists(
      'userId',
      createCardDto.userId,
    );
    if (exists)
      throw new AlredyExistsException('User alredy have a card registered');

    const card = CardEntity.toEntity(createCardDto);
    const res: Card = await this.repository.save(card);

    return CardEntity.toDto(res);
  }

  async findCardById(id: string): Promise<GetCardDto> {
    const card: Card = await this.repository.findById(id);
    if (!card)
      throw new NotFoundException('Unable to find a card with this id.');

    return CardEntity.toDto(card);
  }

  async findCardByUserId(id: string): Promise<GetCardDto> {
    const card: Card = await this.repository.findCardByUserId(id);
    if (!card)
      throw new NotFoundException('Unable to find a card with this user id.');

    return CardEntity.toDto(card);
  }

  async updateCardById(
    id: string,
    updateCardDto: UpdateCardDto,
  ): Promise<GetCardDto> {
    const exists = await this.repository.checkIfExists('id', id);
    if (!exists)
      throw new NotFoundException('Unable to find a card with this id.');

    const card: Card = await this.repository.update(id, updateCardDto);
    return CardEntity.toDto(card);
  }

  async removeCardById(id: string): Promise<GetCardDto> {
    const exists = await this.repository.checkIfExists('id', id);
    if (!exists)
      throw new NotFoundException('Unable to find a card with this id.');

    const card: Card = await this.repository.delete(id);
    return CardEntity.toDto(card);
  }
}
