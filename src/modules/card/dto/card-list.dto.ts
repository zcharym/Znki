import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CommonListDto } from 'src/shared/dto/common.dto';
import { CardWhereDto } from './card-where.dto';
export class CardListDto extends CommonListDto
  implements Prisma.CardFindManyArgs {
  @ApiProperty({ type: CardWhereDto, required: false })
  @ValidateNested()
  @Type(() => CardWhereDto)
  where: CardWhereDto;
  // @ApiProperty({ required: true })
  orderBy: Prisma.Enumerable<Prisma.CardOrderByInput>;
}
