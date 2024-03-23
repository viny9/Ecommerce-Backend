export class GetCardDto {
  constructor(
    readonly id: string,
    readonly lastFourNumber: number,
    readonly expMounth: number,
    readonly expYear: number,
    readonly brand: string,
  ) {}
}
