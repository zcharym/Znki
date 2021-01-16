import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  CardStatusEnum,
  NoteTypeEnum,
} from '../../../shared/consts/common.const';

export class CreateNoteDto {
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

  @ApiProperty({ enum: CardStatusEnum, description: 'card status' })
  @IsEnum(CardStatusEnum)
  cardStatus: CardStatusEnum;

  @ApiProperty({ enum: NoteTypeEnum, description: 'note type' })
  @IsEnum(NoteTypeEnum)
  noteType: NoteTypeEnum;
}
