import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Cards } from './card.entity';
import { CardRepository } from 'src/database/repositorys/card-repository';
import { GetCardDto } from './dto/get-card.dto';

@Injectable()
export class CardService {
  constructor(private repository: CardRepository) {}

  async create(createCardDto: CreateCardDto) {
    const card = new Cards(createCardDto);
    const res = await this.repository.save(card);

    return new GetCardDto(
      res.id,
      res.lastFourNumber,
      res.expMounth,
      res.expYear,
      res.brand,
    );
  }

  async findOne(id: string) {
    const card = await this.repository.findById(id);

    return new GetCardDto(
      card.id,
      card.lastFourNumber,
      card.expMounth,
      card.expYear,
      card.brand,
    );
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const card = await this.repository.update(id, updateCardDto);

    return new GetCardDto(
      card.id,
      card.lastFourNumber,
      card.expMounth,
      card.expYear,
      card.brand,
    );
  }

  async remove(id: string) {
    const card = await this.repository.delete(id);

    return new GetCardDto(
      card.id,
      card.lastFourNumber,
      card.expMounth,
      card.expYear,
      card.brand,
    );
  }
}
