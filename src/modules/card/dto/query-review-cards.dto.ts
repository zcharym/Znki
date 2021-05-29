import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class RetrieveReviewCardDto {
  @ApiProperty({ type: Number, description: 'deck id' })
  @IsNotEmpty()
  @IsNumber()
  deckId: number;

  @ApiProperty({ type: Number, description: 'default length:20' })
  @IsNotEmpty()
  @IsNumber()
  @Transform(val => (val > 20 ? val : val))
  length: number;
}
