import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NoteTypeEnum, Prisma } from '@prisma/client';

export class CreateNoteDto implements Prisma.NoteCreateWithoutCardInput {
  @ApiPropertyOptional({ type: Number, description: 'template id' })
  @IsNumber()
  @IsOptional()
  templateId?: number;

  @ApiProperty({ type: String, description: 'note content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  // todo shortcut for creating a note.

  @ApiProperty({ enum: NoteTypeEnum, description: 'note type' })
  @IsEnum(NoteTypeEnum)
  type: NoteTypeEnum;
}
