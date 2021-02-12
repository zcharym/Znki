import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateNoteDto } from './create-note.dto';

type TCreateCardAndNote = Prisma.CardCreateInput & Prisma.NoteCreateInput;

export class CreateCardAndNoteDto implements TCreateCardAndNote {
  title: string;
  type?: number;
  due?: string | Date;
  reviews?: number;

  notes?: Prisma.NoteCreateNestedManyWithoutCardInput;
  card: Prisma.CardCreateNestedOneWithoutNotesInput;

  @ApiProperty({ type: Number, description: 'deck id' })
  @IsNumber()
  did: number;

  @ApiPropertyOptional({ type: Number, description: 'card template id' })
  @IsNumber()
  @IsOptional()
  tid?: number;

  @ApiProperty({ type: String, description: 'question of this card' })
  @IsString()
  @IsNotEmpty()
  tittle: string;

  @ApiProperty({ type: CreateNoteDto, isArray: true, description: '' })
  noteList: CreateNoteDto[];
}
