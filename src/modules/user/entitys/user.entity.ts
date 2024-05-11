import { CreateUserDto } from '../dto/create-user.dto';
import { Address, User } from '@prisma/client';
import { GetUserDto } from '../dto/get-user.dto';
import { AddressDto } from '../dto/address.dto';
import { CardEntity } from 'src/modules/card/entitys/card.entity';
import { CartEntity } from 'src/modules/cart/entitys/cart.entity';
import { ListEntity } from 'src/modules/list/entitys/list.entity';

export class UserEntity implements User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  isAdmin: boolean;
  stripeId: string;
  address?: Address;
  card?: CardEntity;
  cart?: CartEntity;
  list?: ListEntity;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(createUserDto: CreateUserDto): UserEntity {
    return Object.assign(new UserEntity(), createUserDto);
  }

  public static toDto(user: UserEntity): GetUserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      isAdmin: user.isAdmin,
    };
  }

  private static toAddressDto(address: UserEntity['address']): AddressDto {
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
}
