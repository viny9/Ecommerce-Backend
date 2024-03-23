import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { IsOptional } from 'class-validator';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsOptional()
  brand: string;

  @IsOptional()
  expMounth: number;

  @IsOptional()
  expYear: number;

  @IsOptional()
  lastFourNumber: number;
}
