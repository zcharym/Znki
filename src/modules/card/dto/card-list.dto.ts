import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, Min } from 'class-validator';
import { ToInt } from 'src/shared/decorators/transform.decorator';
export class CardListDto implements Prisma.CardFindManyArgs {
  @ApiProperty({ required: true })
  @Min(1)
  @ToInt()
  take: number;
  @ApiProperty({ required: true })
  @IsNumber()
  @ToInt()
  skip: number;
  @ApiProperty({ required: true })
  where: Prisma.CardWhereInput;
  @ApiProperty({ required: true })
  orderBy: Prisma.Enumerable<Prisma.CardOrderByInput>;
  cursor;
  distinct;
}
