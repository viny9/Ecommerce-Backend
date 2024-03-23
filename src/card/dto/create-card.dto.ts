import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsNumber()
  lastFourNumber: number;

  @IsNotEmpty()
  @IsNumber()
  expMounth: number;

  @IsNotEmpty()
  @IsNumber()
  expYear: number;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  userId: string;
}
