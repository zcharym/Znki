import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateCardDto implements Prisma.CardCreateInput {
  @ApiProperty({ type: Number, description: 'deck id' })
  @IsNumber()
  did: number;

  @ApiPropertyOptional({ type: Number, description: 'template id' })
  @IsNumber()
  @IsOptional()
  tid?: number;
}
