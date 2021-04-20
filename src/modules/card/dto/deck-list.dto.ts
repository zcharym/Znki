import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';
export class DeckListDto implements Prisma.DeckFindManyArgs {
  @ApiProperty({ required: true })
  @Min(1)
  @Transform(val => {
    if (typeof val === 'string') {
      return Number(val);
    }
    return val;
  })
  take: number;
  @ApiProperty({ required: true })
  @IsNumber()
  @Transform(val => {
    if (typeof val === 'string') {
      return Number(val);
    }
    return val;
  })
  skip: number;
  @ApiProperty()
  where: Prisma.DeckWhereInput;
  @ApiProperty()
  orderBy: Prisma.Enumerable<Prisma.DeckOrderByInput>;
  cursor;
  distinct;
}
