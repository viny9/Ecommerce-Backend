import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { Address, Card, User } from '@prisma/client';

export class Users implements User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  isAdmin: boolean;
  stripeId: string;
  address?: Address;
  card?: Card;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(createUserDto: CreateUserDto) {
    this.id = randomUUID();
    this.name = createUserDto.name;
    this.email = createUserDto.email;
    this.phone = createUserDto.phone;
    this.password = createUserDto.password;
    this.isAdmin = false;
    this.stripeId = 'Teste';
    this.address = createUserDto.address;
  }
}
