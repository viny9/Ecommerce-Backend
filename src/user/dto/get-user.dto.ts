export class GetUserDto {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly name: string,
    readonly phone: string,
    readonly isAdmin: boolean,
  ) {}
}
