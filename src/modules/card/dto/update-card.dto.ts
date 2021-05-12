import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCardDto implements Partial<Prisma.CardCreateInput> {
  @ApiProperty({ type: Number, description: 'card id' })
  @IsNumber()
  id: number;

  @ApiPropertyOptional({ type: Number, description: 'card template id' })
  @IsNumber()
  @IsOptional()
  templateId?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'question of this card',
  })
  @IsString()
  @IsOptional()
  title?: string;
}
