import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/database/repositorys/user-repository';
import { UserDetailsDto } from './dto/user-details.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async create(user: CreateUserDto) {
    const { id, email, name, phone, is_admin } =
      await this.repository.create(user);

    return new UserDetailsDto(id, email, name, phone, is_admin);
  }

  async findAll() {
    const users = await this.repository.findAll();

    return users.map((user: User) => {
      return new UserDetailsDto(
        user.id,
        user.email,
        user.name,
        user.phone,
        user.is_admin,
      );
    });
  }

  async findOne(userId: string) {
    const { id, email, name, phone, is_admin } =
      await this.repository.findOne(userId);

    return new UserDetailsDto(id, email, name, phone, is_admin);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const { id, email, name, phone, is_admin } = await this.repository.update(
      userId,
      updateUserDto,
    );

    return new UserDetailsDto(id, email, name, phone, is_admin);
  }

  async remove(userId: string) {
    const { id, email, name, phone, is_admin } =
      await this.repository.remove(userId);

    return new UserDetailsDto(id, email, name, phone, is_admin);
  }
}
