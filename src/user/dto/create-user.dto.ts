export class CreateUserDto {
  name: string;
  email: string;
  phone: string;
  is_admin: boolean;
  stripe_id: string;
  address_id: string;
  card_id: string;
  password: string;

  constructor() {}
}
