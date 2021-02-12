import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NoteTypeEnum } from '../../../shared/consts/common.const';
import { Prisma } from '@prisma/client';

export class CreateNoteDto implements Prisma.NoteCreateInput {
  @ApiPropertyOptional({ type: Number, description: 'template id' })
  @IsNumber()
  @IsOptional()
  tid?: number;

  @ApiProperty({ type: String, description: '' })
  @IsString()
  zkey: string;

  @ApiProperty({ type: String, description: '' })
  @IsString()
  zValue: string;

  @ApiProperty({ type: Number, description: 'card id' })
  @IsNumber()
  cid: number;

  @ApiProperty({ enum: NoteTypeEnum, description: 'note type' })
  @IsEnum(NoteTypeEnum)
  noteType: NoteTypeEnum;
}
