import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/database/repositorys/user-repository';
import { UserEntity } from './entitys/user.entity';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async newUser(createUserDto: CreateUserDto) {
    const exists = await this.repository.checkIfExists(
      'email',
      createUserDto.email,
    );
    if (exists)
      throw new BadRequestException('User alredy exists with this email.');

    const user = UserEntity.toEntity(createUserDto);
    const res = await this.repository.save(user);

    return UserEntity.toDto(res);
  }

  async findAllUsers() {
    const users = await this.repository.findAll();
    return users.map((user: UserEntity) => UserEntity.toDto(user));
  }

  async findUserById(userId: string) {
    const user = await this.repository.findById(userId);
    if (!user) throw new NotFoundException('Couldnt found User with this id');

    return UserEntity.toDto(user);
  }

  async updateUserById(userId: string, updateUserDto: UpdateUserDto) {
    const exists = await this.repository.checkIfExists('id', userId);
    if (!exists) throw new NotFoundException('Couldnt found User with this id');

    const user = await this.repository.update(userId, updateUserDto);
    return UserEntity.toDto(user);
  }

  async removeUser(userId: string) {
    const exists = await this.repository.checkIfExists('id', userId);
    if (!exists) throw new NotFoundException('Couldnt found User with this id');

    const user = await this.repository.delete(userId);
    return UserEntity.toDto(user);
  }
}
