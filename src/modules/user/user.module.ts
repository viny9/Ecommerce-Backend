import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AddressService } from '../address/address.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, AddressService],
})
export class UserModule {}
