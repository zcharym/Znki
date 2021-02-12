import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NoteTypeEnum, Prisma } from '@prisma/client';

export class CreateNoteDto implements Omit<Prisma.NoteCreateInput, 'card'> {
  @ApiPropertyOptional({ type: Number, description: 'template id' })
  @IsNumber()
  @IsOptional()
  tid?: number;

  @ApiProperty({ type: String, description: 'note content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: Number, description: 'card id' })
  @IsNumber()
  cid: number;

  @ApiProperty({ enum: NoteTypeEnum, description: 'note type' })
  @IsEnum(NoteTypeEnum)
  type: NoteTypeEnum;
}
