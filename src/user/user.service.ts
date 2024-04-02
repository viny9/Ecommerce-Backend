import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/database/repositorys/user-repository';
import { Users } from './entitys/user.entity';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = new Users(createUserDto);
    const res = await this.repository.save(user);

    return Users.toUserDto(res);
  }

  async findAll() {
    const users = await this.repository.findAll();
    return users.map((user: Users) => Users.toUserDto(user));
  }

  async findOne(userId: string) {
    const user = await this.repository.findById(userId);
    return Users.toUserDto(user);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.repository.update(userId, updateUserDto);
    return Users.toUserDto(user);
  }

  async remove(userId: string) {
    const user = await this.repository.delete(userId);
    return Users.toUserDto(user);
  }
}
