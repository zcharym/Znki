import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ReviewStatusEnum } from 'src/shared/consts/common.const';

export class ReviewCardDto {
  @ApiProperty({ type: Number, description: 'card id' })
  @IsNotEmpty()
  @IsNumber()
  cardId: number;
  @ApiProperty({ enum: ReviewStatusEnum, description: 'review status' })
  @IsNotEmpty()
  @IsEnum(ReviewStatusEnum)
  status: ReviewStatusEnum;
}
