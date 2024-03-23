import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/database/repositorys/user-repository';
import { GetUserDto } from './dto/get-user.dto';
import { Users } from './user.entity';
import { GetCardDto } from 'src/card/dto/get-card.dto';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = new Users(createUserDto);

    const { id, email, name, phone, isAdmin, address, card } =
      await this.repository.save(user);

    return new GetUserDto(id, email, name, phone, isAdmin, address, card);
  }

  async findAll() {
    const users = await this.repository.findAll();

    return users.map((user: Users) => {
      const address = user.address;
      const addressDto = new AddressDto(
        address.id,
        address.cep,
        address.city,
        address.state,
        address.extra,
        address.number,
        address.neighborhood,
      );

      const card = user.card;

      const cardDto = card
        ? new GetCardDto(
            card.id,
            card.lastFourNumber,
            card.expMounth,
            card.expYear,
            card.brand,
          )
        : null;

      return new GetUserDto(
        user.id,
        user.email,
        user.name,
        user.phone,
        user.isAdmin,
        addressDto,
        cardDto,
      );
    });
  }

  async findOne(userId: string) {
    const { id, email, name, phone, isAdmin, address, card } =
      await this.repository.findById(userId);

    const addressDto = new AddressDto(
      address.id,
      address.cep,
      address.city,
      address.state,
      address.extra,
      address.number,
      address.neighborhood,
    );

    const cardDto = card
      ? new GetCardDto(
          card.id,
          card.lastFourNumber,
          card.expMounth,
          card.expYear,
          card.brand,
        )
      : null;

    return new GetUserDto(id, email, name, phone, isAdmin, addressDto, cardDto);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const { id, email, name, phone, isAdmin, address, card } =
      await this.repository.update(userId, updateUserDto);

    const addressDto = new AddressDto(
      address.id,
      address.cep,
      address.city,
      address.state,
      address.extra,
      address.number,
      address.neighborhood,
    );

    const cardDto = card
      ? new GetCardDto(
          card.id,
          card.lastFourNumber,
          card.expMounth,
          card.expYear,
          card.brand,
        )
      : null;

    return new GetUserDto(id, email, name, phone, isAdmin, addressDto, cardDto);
  }

  async remove(userId: string) {
    const { id, email, name, phone, isAdmin, address, card } =
      await this.repository.delete(userId);

    const addressDto = new AddressDto(
      address.id,
      address.cep,
      address.city,
      address.state,
      address.extra,
      address.number,
      address.neighborhood,
    );

    const cardDto = card
      ? new GetCardDto(
          card.id,
          card.lastFourNumber,
          card.expMounth,
          card.expYear,
          card.brand,
        )
      : null;

    return new GetUserDto(id, email, name, phone, isAdmin, addressDto, cardDto);
  }
}
