import { GetCardDto } from 'src/card/dto/get-card.dto';
import { AddressDto } from './address.dto';

export class GetUserDto {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly name: string,
    readonly phone: string,
    readonly isAdmin: boolean,
    readonly address: AddressDto,
    readonly card?: GetCardDto,
  ) {}
}
