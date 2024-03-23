export class AddressDto {
  constructor(
    readonly id: string,
    readonly cep: string,
    readonly city: string,
    readonly state: string,
    readonly extra: string,
    readonly number: number,
    readonly neighborhood: string,
  ) {}
}
