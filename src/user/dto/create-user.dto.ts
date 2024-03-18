import { Address } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsNotEmpty()
  address: Address;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
