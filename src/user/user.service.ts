import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/database/repositorys/user-repository';
import { GetUserDto } from './dto/get-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async create(user: CreateUserDto) {
    const { id, email, name, phone, isAdmin } =
      await this.repository.save(user);

    return new GetUserDto(id, email, name, phone, isAdmin);
  }

  async findAll() {
    const users = await this.repository.findAll();

    return users.map((user: User) => {
      return new GetUserDto(
        user.id,
        user.email,
        user.name,
        user.phone,
        user.isAdmin,
      );
    });
  }

  async findOne(userId: string) {
    const { id, email, name, phone, isAdmin } =
      await this.repository.findById(userId);

    return new GetUserDto(id, email, name, phone, isAdmin);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const { id, email, name, phone, isAdmin } = await this.repository.update(
      userId,
      updateUserDto,
    );

    return new GetUserDto(id, email, name, phone, isAdmin);
  }

  async remove(userId: string) {
    const { id, email, name, phone, isAdmin } =
      await this.repository.delete(userId);

    return new GetUserDto(id, email, name, phone, isAdmin);
  }
}
