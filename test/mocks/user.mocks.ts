import { Address } from '@prisma/client';
import { GetUserDto } from 'src/modules/user/dto/get-user.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { UserEntity } from 'src/modules/user/entitys/user.entity';

const createUsers = (): UserEntity[] => {
  return [
    {
      id: '122',
      email: 'teste@gmail.com',
      name: 'teste',
      isAdmin: true,
      phone: '11111111111',
      password: '123456',
      stripeId: '2121',
      address: createUserAddress()[0],
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    },
    {
      id: '332',
      email: 'teste2@gmail.com',
      name: 'teste2',
      isAdmin: false,
      phone: '22222222222',
      password: '654321',
      stripeId: '1111',
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    },
  ];
};

const createUsersDto = (): GetUserDto[] => {
  return [
    {
      id: '122',
      email: 'teste@gmail.com',
      name: 'teste',
      isAdmin: true,
      phone: '11111111111',
    },
    {
      id: '332',
      email: 'teste2@gmail.com',
      name: 'teste2',
      isAdmin: false,
      phone: '22222222222',
    },
  ];
};

const createUserUpdateDto = (): UpdateUserDto => {
  return {
    name: 'Vinicius Carvalho',
    email: 'viniciuscarvalho@gmail.com',
    phone: '11111111111',
  };
};

const createUserAddress = (): Address[] => {
  return [
    {
      id: '1dsa',
      cep: 'adasdsasdasd',
      city: 'dsdsd',
      extra: 'assa',
      state: 'ddsa',
      number: 0,
      neighborhood: 'sadaddasda',
      userId: '122',
      orderId: 'd',
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    },
    {
      id: '2dsaasd',
      cep: 'ddddd',
      city: 'dasdasdasd',
      extra: 'vbfbdbdfb',
      state: 'dd',
      number: 0,
      neighborhood: 'xccvxcvcxv',
      userId: '2',
      orderId: 'x',
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    },
  ];
};

export const userMocks = {
  createUsers,
  createUsersDto,
  createUserUpdateDto,
  createUserAddress,
};
