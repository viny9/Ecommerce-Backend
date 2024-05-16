import { AddressService } from './../../../src/modules/address/address.service';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Address } from '@prisma/client';
import { DatabaseModule } from 'src/database/database.module';
import { AddressRepository } from 'src/database/repositorys/address.repository';
import { UpdateAddressDto } from 'src/modules/address/dto/update-address.dto';
import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { addressMock } from 'test/mocks/address.mock';

describe('Address service', () => {
  let addressService: AddressService;
  let addressRepository: AddressRepository;

  const addressesMock = addressMock.createAddresses();
  const createAddressDtoMock = addressMock.createAddressDto();
  const getAddressDtoMock = addressMock.createGetAddressDto();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [AddressService],
    }).compile();

    addressService = moduleRef.get<AddressService>(AddressService);
    addressRepository = moduleRef.get<AddressRepository>(AddressRepository);
  });

  describe('create', () => {
    beforeEach(() => {
      jest
        .spyOn(addressRepository, 'save')
        .mockImplementation(async (newAddress: Address) => {
          const address: Address = {
            id: '1',
            ...newAddress,
            createdAt: new Date(),
          };

          addressesMock.push(address);
          return address;
        });
    });

    it('Should create and return an address on Dto format', async () => {
      const address = await addressService.create('1', createAddressDtoMock);
      expect(address).toEqual(getAddressDtoMock);
    });
  });

  describe('findAddressById', () => {
    beforeEach(() => {
      jest
        .spyOn(addressRepository, 'findById')
        .mockImplementation(async (id: string) =>
          addressesMock.find((address) => address.id === id),
        );
    });

    it('Should return a user address in Dto format by id', async () => {
      const address = await addressService.findAddressById('1');

      expect(address).toEqual(AddressEntity.toDto(addressesMock[0]));
    });

    it('Should pass a wrong id and return an NotFoundException', async () => {
      const userError = addressService.findAddressById('3');

      expect(userError).rejects.toThrow(
        'Unable to find this address by this id',
      );
      expect(userError).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('findAddressByUserId', () => {
    beforeEach(() => {
      jest
        .spyOn(addressRepository, 'findAddressByUserId')
        .mockImplementation(async (userId: string) =>
          addressesMock.find((address) => address.userId === userId),
        );
    });

    it('Should return a user address in Dto format by user id', async () => {
      const address = await addressService.findAddressByUserId('1');

      expect(address).toEqual(AddressEntity.toDto(addressesMock[0]));
    });

    it('Should pass a wrong user id and return an NotFoundException', async () => {
      const userError = addressService.findAddressByUserId('3');

      expect(userError).rejects.toThrow(
        'Unable to find this address by this user id',
      );
      expect(userError).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('updateAddressById', () => {
    beforeEach(() => {
      jest.spyOn(addressRepository, 'checkIfExists').mockResolvedValue(true);

      jest
        .spyOn(addressRepository, 'update')
        .mockImplementation(
          async (id: string, updatedAddress: UpdateAddressDto) => {
            const address = addressesMock.find((address) => address.id === id);

            return {
              ...address,
              ...updatedAddress,
            };
          },
        );
    });

    it('Should update address', async () => {
      const addressUpdates: UpdateAddressDto = {
        cep: '12111111111',
      };

      const updatedADdress = await addressService.updateAddressById(
        '1',
        addressUpdates,
      );

      expect(updatedADdress.cep).toBe(addressUpdates.cep);
    });

    it('Should return a NotFoundException if checkIfExists return false', async () => {
      jest.spyOn(addressRepository, 'checkIfExists').mockResolvedValue(false);

      const updatedError = addressService.updateAddressById('4', {});

      expect(updatedError).rejects.toBeInstanceOf(NotFoundException);
      expect(updatedError).rejects.toThrow(
        'Unable to find address by this id ',
      );
    });
  });
});
