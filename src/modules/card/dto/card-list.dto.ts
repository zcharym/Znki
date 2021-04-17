import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, Min } from 'class-validator';
export class CardListDto implements Prisma.CardFindManyArgs {
  @ApiProperty({ required: true })
  @Min(1)
  take: number;
  @ApiProperty({ required: true })
  @IsNumber()
  skip: number;
  @ApiProperty({ required: true })
  where: Prisma.CardWhereInput;
  @ApiProperty({ required: true })
  orderBy: Prisma.Enumerable<Prisma.CardOrderByInput>;
  cursor;
  distinct;
}
