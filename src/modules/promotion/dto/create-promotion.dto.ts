import { IsNotEmpty } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startAt: Date;

  @IsNotEmpty()
  endAt: Date;

  @IsNotEmpty()
  description: string;
}
