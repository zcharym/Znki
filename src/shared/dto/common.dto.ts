import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { ToInt } from '../decorators/transform.decorator';

export class CommonListDto {
  @ApiProperty({ type: Number, required: true })
  @Min(1)
  @ToInt()
  take: number;
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @ToInt()
  skip: number;
}
