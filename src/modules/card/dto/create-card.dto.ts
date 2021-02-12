import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCardDto implements Prisma.CardCreateInput {
  @ApiProperty({ type: Number, description: 'deck id' })
  @IsNumber()
  did: number;

  @ApiPropertyOptional({ type: Number, description: 'template id' })
  @IsNumber()
  @IsOptional()
  tid?: number;

  @ApiProperty({ type: String, description: 'question of this card' })
  @IsString()
  @IsNotEmpty()
  title: string;
}
