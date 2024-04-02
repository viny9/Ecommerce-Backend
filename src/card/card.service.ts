import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Cards } from './entitys/card.entity';
import { CardRepository } from 'src/database/repositorys/card-repository';
import { GetCardDto } from './dto/get-card.dto';

@Injectable()
export class CardService {
  constructor(private repository: CardRepository) {}

  async create(createCardDto: CreateCardDto): Promise<GetCardDto> {
    const card = new Cards(createCardDto);
    const res: Cards = await this.repository.save(card);

    return Cards.toCardDto(res);
  }

  async findOne(id: string): Promise<GetCardDto> {
    const card: Cards = await this.repository.findById(id);
    return Cards.toCardDto(card);
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<GetCardDto> {
    const card: Cards = await this.repository.update(id, updateCardDto);
    return Cards.toCardDto(card);
  }

  async remove(id: string): Promise<GetCardDto> {
    const card: Cards = await this.repository.delete(id);
    return Cards.toCardDto(card);
  }
}
