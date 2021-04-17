import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, Min } from 'class-validator';
export class DeckListDto implements Prisma.DeckFindManyArgs {
  @ApiProperty()
  select: Prisma.DeckSelect;
  @ApiProperty({ required: true })
  @Min(1)
  take: number;
  @ApiProperty({ required: true })
  @IsNumber()
  skip: number;
  @ApiProperty()
  where: Prisma.DeckWhereInput;
  @ApiProperty()
  orderBy: Prisma.Enumerable<Prisma.DeckOrderByInput>;
  cursor;
  distinct;
}
