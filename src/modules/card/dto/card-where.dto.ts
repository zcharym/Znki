import { Prisma, CardStatusEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';

export class CardWhereDto implements Prisma.CardWhereInput {
  @ApiProperty({ type: Number, required: true })
  @Min(0)
  deckId: number;
  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  templateId: number;
  @ApiProperty({ type: String, required: false })
  @IsString()
  title: string;
  @ApiProperty({ enum: CardStatusEnum, required: false })
  @IsEnum(CardStatusEnum)
  status: CardStatusEnum;
}
