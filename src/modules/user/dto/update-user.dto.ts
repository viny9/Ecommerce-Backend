import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';
import { Address } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  address: Address;
}
