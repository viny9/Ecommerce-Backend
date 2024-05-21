import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/database/repositorys/user.repository';
import { UserEntity } from './entitys/user.entity';
import { AddressRepository } from 'src/database/repositorys/address.repository';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private addressRepository: AddressRepository,
  ) {}

  async findAllUsers() {
    const users = await this.repository.findAll();
    return users.map((user: UserEntity) => UserEntity.toDto(user));
  }

  async findUserByEmail(email: string) {
    const user = await this.repository.findByEmail(email);
    if (!user)
      throw new NotFoundException('Unable to found User with this email');

    return UserEntity.toDto(user);
  }

  async findUserById(userId: string) {
    const user = await this.repository.findById(userId);
    if (!user) throw new NotFoundException('Unable to found User with this id');

    return UserEntity.toDto(user);
  }

  async updateUserById(userId: string, updateUserDto: UpdateUserDto) {
    const exists = await this.repository.checkIfExists('id', userId);
    if (!exists)
      throw new NotFoundException('Unable to found User with this id');

    const user = await this.repository.update(userId, updateUserDto);
    return UserEntity.toDto(user);
  }

  async removeUser(userId: string) {
    const exists = await this.repository.checkIfExists('id', userId);
    if (!exists)
      throw new NotFoundException('Unable to found User with this id');

    const user: UserEntity = await this.repository.delete(userId);

    if (user.address) await this.addressRepository.delete(user.address.id);
    return UserEntity.toDto(user);
  }
}
