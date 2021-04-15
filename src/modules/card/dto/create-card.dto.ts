import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateNoteDto } from './create-note.dto';
import { Type } from 'class-transformer';

export class CreateCardDto implements Omit<Prisma.CardCreateInput, 'notes'> {
  @ApiProperty({ type: Number, description: 'deck id' })
  @IsNumber()
  deckId: number;

  @ApiPropertyOptional({ type: Number, description: 'card template id' })
  @IsNumber()
  @IsOptional()
  templateId?: number;

  @ApiProperty({ type: String, description: 'question of this card' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: [CreateNoteDto], description: 'note list' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateNoteDto)
  notes?: CreateNoteDto[];
}
