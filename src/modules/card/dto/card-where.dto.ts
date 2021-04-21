import { Prisma, CardStatusEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CardWhereDto implements Prisma.CardWhereInput {
  @ApiProperty({ type: Number, required: true })
  @Min(0)
  deckId: number;
  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @IsOptional()
  templateId: number;
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  title: string;
  @ApiProperty({ enum: CardStatusEnum, required: false })
  @IsEnum(CardStatusEnum)
  @IsOptional()
  status: CardStatusEnum;
}
