import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import { Address, User } from '@prisma/client';
import { GetUserDto } from '../dto/get-user.dto';
import { AddressDto } from '../dto/address.dto';
import { Cards } from 'src/modules/card/entitys/card.entity';
import { Carts } from 'src/modules/cart/entitys/cart.entity';
import { Lists } from 'src/modules/list/entitys/list.entity';

export class Users implements User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  isAdmin: boolean;
  stripeId: string;
  address?: Address;
  card?: Cards;
  cart?: Carts;
  list?: Lists;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(createUserDto: CreateUserDto) {
    this.id = randomUUID();
    this.name = createUserDto.name;
    this.email = createUserDto.email;
    this.phone = createUserDto.phone;
    this.password = createUserDto.password;
    this.isAdmin = false;
    this.stripeId = 'Teste';
    this.address = createUserDto.address;
    // this.card = Cards.toEntity();
    this.list = Lists.toEntity(randomUUID(), this.id);
    this.cart = Carts.toEntity(randomUUID(), this.id);
  }

  private static toAddressDto(address: Users['address']): AddressDto {
    return {
      id: address.id || '',
      cep: address.cep,
      state: address.state,
      city: address.city,
      neighborhood: address.neighborhood,
      number: address.number,
      extra: address.extra,
    };
  }

  static toUserDto(user: Users): GetUserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      isAdmin: user.isAdmin,
      address: this.toAddressDto(user.address),
      card: Cards.toCardDto(user.card) || null,
    };
  }
}
