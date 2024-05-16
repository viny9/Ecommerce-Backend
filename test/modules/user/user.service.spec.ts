import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Address } from '@prisma/client';
import { DatabaseModule } from 'src/database/database.module';
import { AddressRepository } from 'src/database/repositorys/address.repository';
import { UserRepository } from 'src/database/repositorys/user.repository';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { UserEntity } from 'src/modules/user/entitys/user.entity';
import { UserModule } from 'src/modules/user/user.module';
import { UserService } from 'src/modules/user/user.service';

describe('User service', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let addressRepository: AddressRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, UserModule],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    addressRepository = moduleRef.get<AddressRepository>(AddressRepository);
  });

  const users: UserEntity[] = [
    {
      id: '1',
      name: 'vinicius',
      email: 'viniolicar2004@gmail.com',
      isAdmin: true,
      phone: '61984977155',
      password: '654321',
      stripeId: '1',
      address: {
        id: '1dsa',
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
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    },
    {
      id: '2',
      name: 'teste',
      email: 'teste@gmail.com',
      isAdmin: false,
      phone: '11111111111',
      password: '123456',
      stripeId: '2',
      address: undefined,
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    },
  ];

  describe('findAllUsers', () => {
    it('Should return all users in Dto format', async () => {
      jest.spyOn(userRepository, 'findAll').mockResolvedValue(users);

      const usersDto = users.map((user) => UserEntity.toDto(user));
      expect(await userService.findAllUsers()).toEqual(usersDto);
    });

    it('Should return an empty array ', async () => {
      jest.spyOn(userRepository, 'findAll').mockResolvedValue([]);

      expect(await userService.findAllUsers()).toEqual([]);
    });
  });

  describe('findUserByEmail', () => {
    beforeEach(() => {
      jest
        .spyOn(userRepository, 'findByEmail')
        .mockImplementation(async (email: string) =>
          users.find((user) => user.email === email),
        );
    });

    it('Should return a user in Dto format by email', async () => {
      const user = await userService.findUserByEmail(
        'viniolicar2004@gmail.com',
      );

      expect(user).toEqual(UserEntity.toDto(users[0]));
    });

    it('Should pass a wrong email and return an NotFoundException', async () => {
      const userError = userService.findUserByEmail('teste32@gmail.com');

      expect(userError).rejects.toThrow('Unable to found User with this email');
      expect(userError).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('findUserById', () => {
    beforeEach(() => {
      jest
        .spyOn(userRepository, 'findById')
        .mockImplementation(async (id: string) =>
          users.find((user) => user.id === id),
        );
    });

    it('Should return a user in Dto format by id', async () => {
      const user = await userService.findUserById('1');

      expect(user).toEqual(UserEntity.toDto(users[0]));
    });

    it('Should pass a wrong id and return an NotFoundException', async () => {
      const userError = userService.findUserById('3');

      expect(userError).rejects.toThrow('Unable to found User with this id');
      expect(userError).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('updateUserById', () => {
    beforeEach(() => {
      jest.spyOn(userRepository, 'checkIfExists').mockResolvedValue(true);

      jest
        .spyOn(userRepository, 'update')
        .mockImplementation(async (id: string, userUpadates: UpdateUserDto) => {
          const user = users.find((user) => user.id === id);

          return {
            ...user,
            ...userUpadates,
          };
        });
    });

    it('Should update user', async () => {
      const userUpdates: UpdateUserDto = {
        name: 'Vinicius Carvalho',
        email: 'viniciuscarvalho@gmail.com',
        phone: '11111111111',
      };

      const updatedUser = await userService.updateUserById('1', userUpdates);

      expect(updatedUser.name).toBe(userUpdates.name);
      expect(updatedUser.email).toBe(userUpdates.email);
      expect(updatedUser.phone).toBe(userUpdates.phone);
    });

    it('Should return a NotFoundException if checkIfExists return false', async () => {
      jest.spyOn(userRepository, 'checkIfExists').mockResolvedValue(false);

      const updatedError = userService.updateUserById('4', {});

      expect(updatedError).rejects.toBeInstanceOf(NotFoundException);
      expect(updatedError).rejects.toThrow('Unable to found User with this id');
    });
  });

  describe('removeUser', () => {
    const addresses: Address[] = [
      {
        id: '1dsa',
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

    beforeEach(() => {
      jest.spyOn(userRepository, 'checkIfExists').mockResolvedValue(true);
      jest.spyOn(userRepository, 'delete').mockImplementation(async (id) => {
        const userIndex = users.findIndex((user) => user.id === id);
        const removedUser = users[userIndex];
        users.splice(userIndex, 1);

        return removedUser;
      });

      jest.spyOn(addressRepository, 'delete').mockImplementation(async (id) => {
        const addressIndex = addresses.findIndex(
          (address) => address.id === id,
        );
        const removedAddress = addresses[addressIndex];
        addresses.splice(addressIndex, 1);

        return removedAddress;
      });
    });

    it('Should delete an user and return the obj in Dto format', async () => {
      const deletedUser = await userService.removeUser('2');
      const exists = users
        .map((user) => user.id === deletedUser.id ?? true)
        .includes(true);

      expect(exists).toBeFalsy();
    });

    it('Should delete an user with address and return the obj in Dto format', async () => {
      const deletedUser = await userService.removeUser('1');
      const userExists = users
        .map((user) => user.id === deletedUser.id ?? true)
        .includes(true);

      const addressExists = addresses
        .map((address) => address.userId === deletedUser.id ?? true)
        .includes(true);

      expect(userExists).toBeFalsy();
      expect(addressExists).toBeFalsy();
    });

    it('Should return a NotFoundException if checkIfExists return false', async () => {
      jest.spyOn(userRepository, 'checkIfExists').mockResolvedValue(false);

      const updatedError = userService.removeUser('4');

      expect(updatedError).rejects.toBeInstanceOf(NotFoundException);
      expect(updatedError).rejects.toThrow('Unable to found User with this id');
    });
  });
});
