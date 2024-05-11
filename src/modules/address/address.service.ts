import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from 'src/database/repositorys/address.repository';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(private repository: AddressRepository) {}

  async create(userId: string, createAddressDto: CreateAddressDto) {
    const address = AddressEntity.toEntity(userId, createAddressDto);
    const res = await this.repository.save(address);
    return AddressEntity.toDto(res);
  }

  async findAddressById(id: string) {
    const address = await this.repository.findById(id);
    if (!address)
      throw new NotFoundException('Unable to find this address by this id');

    return AddressEntity.toDto(address);
  }

  async findAddressByUserId(userId: string) {
    const address = await this.repository.findAddressByUserId(userId);

    if (!address)
      throw new NotFoundException(
        'Unable to find this address by this user id',
      );

    return AddressEntity.toDto(address);
  }

  async updateAddressById(id: string, updateAddressDto: UpdateAddressDto) {
    const exists = await this.repository.checkIfExists('id', id);
    if (!exists)
      throw new NotFoundException('Unable to find address by this id ');

    const res = await this.repository.update(id, updateAddressDto);
    return AddressEntity.toDto(res);
  }
}
