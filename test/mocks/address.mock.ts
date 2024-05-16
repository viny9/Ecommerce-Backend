import { Address } from '@prisma/client';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { GetAddressDto } from 'src/modules/address/dto/get-address.dto';

const createAddresses = (): Address[] => {
  return [
    {
      id: '1',
      cep: 'adasdsasdasd',
      city: 'dsdsd',
      extra: 'assa',
      state: 'ddsa',
      number: 0,
      neighborhood: 'sadaddasda',
      userId: '1',
      orderId: 'd',
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    },
    {
      id: '2',
      cep: 'adasdsasdasd',
      city: 'dsdsd',
      extra: 'assa',
      state: 'ddsa',
      number: 0,
      neighborhood: 'sadaddasda',
      userId: '2',
      orderId: 'd',
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    },
  ];
};

const createAddressDto = (): CreateAddressDto => {
  return {
    cep: 'xxxxxxxxx',
    city: 'ccccccc',
    extra: 'xx',
    state: 'xx',
    number: 0,
    neighborhood: 'ccccccccc',
    userId: '3',
  };
};

const createGetAddressDto = (): GetAddressDto => {
  return {
    id: '1',
    cep: 'xxxxxxxxx',
    city: 'ccccccc',
    extra: 'xx',
    state: 'xx',
    number: 0,
    neighborhood: 'ccccccccc',
  };
};

export const addressMock = {
  createAddresses,
  createGetAddressDto,
  createAddressDto,
};
