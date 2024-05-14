import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddressService } from '../address/address.service';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { IsAdmin } from 'src/shared/decorators/is-admin.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly addressService: AddressService,
  ) {}

  @Get()
  @IsAdmin()
  getUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }

  @Get(':id/address')
  getAddressByUserId(@Param('id') id: string) {
    return this.addressService.findAddressByUserId(id);
  }

  @Post(':id/address')
  createAddress(
    @Param('id') id: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressService.create(id, createAddressDto);
  }
}
