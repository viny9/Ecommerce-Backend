import { Address } from '@prisma/client';
import { CreateAddressDto } from '../dto/create-address.dto';
import { GetAddressDto } from '../dto/get-address.dto';

export class AddressEntity implements Address {
  id: string;
  cep: string;
  city: string;
  state: string;
  extra: string;
  number: number;
  neighborhood: string;
  userId: string;
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  public static toEntity(
    userId: string,
    createAddressDto: CreateAddressDto,
    orderId?: string,
  ) {
    return Object.assign(new AddressEntity(), {
      ...createAddressDto,
      userId,
      orderId,
    });
  }

  public static toDto(address: AddressEntity): GetAddressDto {
    return {
      id: address.id,
      cep: address.cep,
      city: address.city,
      state: address.state,
      neighborhood: address.neighborhood,
      number: address.number,
      extra: address.extra,
    };
  }
}
