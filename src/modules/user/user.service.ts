import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/database/repositorys/user-repository';
import { Users } from './entitys/user.entity';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.repository.findByEmail(createUserDto.email);
    if (userExists)
      throw new BadRequestException('User alredy exists with this email.');

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
    if (!user) throw new NotFoundException('Couldnt found User with this id');

    return Users.toUserDto(user);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.repository.findById(userId);
    if (!userExists)
      throw new NotFoundException('Couldnt found User with this id');

    const user = await this.repository.update(userId, updateUserDto);
    return Users.toUserDto(user);
  }

  async remove(userId: string) {
    const userExists = await this.repository.findById(userId);
    if (!userExists)
      throw new NotFoundException('Couldnt found User with this id');

    const user = await this.repository.delete(userId);
    return Users.toUserDto(user);
  }
}
