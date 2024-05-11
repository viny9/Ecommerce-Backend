import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  getAddressById(@Param('id') id: string) {
    return this.addressService.findAddressById(id);
  }

  @Patch(':id')
  updateAddress(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.updateAddressById(id, updateAddressDto);
  }
}
