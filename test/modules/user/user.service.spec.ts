import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/database.module';
import { AddressRepository } from 'src/database/repositorys/address.repository';
import { UserRepository } from 'src/database/repositorys/user.repository';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { UserEntity } from 'src/modules/user/entitys/user.entity';
import { UserModule } from 'src/modules/user/user.module';
import { UserService } from 'src/modules/user/user.service';
import { userMocks } from 'test/mocks/user.mocks';

describe('User service', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let addressRepository: AddressRepository;

  const usersMock = userMocks.createUsers();
  const addressesMock = userMocks.createUserAddress();
  const usersDtoMock = userMocks.createUsersDto();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, UserModule],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    addressRepository = moduleRef.get<AddressRepository>(AddressRepository);
  });

  describe('findAllUsers', () => {
    it('Should return all users in Dto format', async () => {
      jest.spyOn(userRepository, 'findAll').mockResolvedValue(usersMock);

      expect(await userService.findAllUsers()).toEqual(usersDtoMock);
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
          usersMock.find((user) => user.email === email),
        );
    });

    it('Should return a user in Dto format by email', async () => {
      const user = await userService.findUserByEmail('teste@gmail.com');

      expect(user).toEqual(UserEntity.toDto(usersMock[0]));
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
          usersMock.find((user) => user.id === id),
        );
    });

    it('Should return a user in Dto format by id', async () => {
      const user = await userService.findUserById('122');

      expect(user).toEqual(UserEntity.toDto(usersMock[0]));
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
          const user = usersMock.find((user) => user.id === id);

          return {
            ...user,
            ...userUpadates,
          };
        });
    });

    it('Should update user', async () => {
      const updateUserMock = userMocks.createUserUpdateDto();

      const updatedUser = await userService.updateUserById('1', updateUserMock);

      expect(updatedUser.name).toBe(updateUserMock.name);
      expect(updatedUser.email).toBe(updateUserMock.email);
      expect(updatedUser.phone).toBe(updateUserMock.phone);
    });

    it('Should return a NotFoundException if checkIfExists return false', async () => {
      jest.spyOn(userRepository, 'checkIfExists').mockResolvedValue(false);

      const updatedError = userService.updateUserById('4', {});

      expect(updatedError).rejects.toBeInstanceOf(NotFoundException);
      expect(updatedError).rejects.toThrow('Unable to found User with this id');
    });
  });

  describe('removeUser', () => {
    beforeEach(() => {
      jest.spyOn(userRepository, 'checkIfExists').mockResolvedValue(true);
      jest.spyOn(userRepository, 'delete').mockImplementation(async (id) => {
        const userIndex = usersMock.findIndex((user) => user.id === id);
        const removedUser = usersMock[userIndex];
        usersMock.splice(userIndex, 1);

        return removedUser;
      });

      jest.spyOn(addressRepository, 'delete').mockImplementation(async (id) => {
        const addressIndex = addressesMock.findIndex(
          (address) => address.id === id,
        );
        const removedAddress = addressesMock[addressIndex];
        addressesMock.splice(addressIndex, 1);

        return removedAddress;
      });
    });

    it('Should delete an user and return the obj in Dto format', async () => {
      const deletedUser = await userService.removeUser('122');
      const exists = usersMock
        .map((user) => user.id === deletedUser.id ?? true)
        .includes(true);

      expect(exists).toBeFalsy();
    });

    it('Should delete an user with address and return the obj in Dto format', async () => {
      const deletedUser = await userService.removeUser('332');
      const userExists = usersMock
        .map((user) => user.id === deletedUser.id ?? true)
        .includes(true);

      const addressExists = addressesMock
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
