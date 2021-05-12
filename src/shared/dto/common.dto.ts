import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ExpandOperator } from 'rxjs/internal/operators/expand';
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
export class CommonResListDto<T> {
  @ApiProperty({ type: Object, isArray: true })
  data: T[];
  @ApiProperty({ type: Number })
  total: number;
}
export class CommonResDto<T> {
  [key: string]: any;
}

export class CommonIdSetDto {
  @ApiProperty({ type: Number, isArray: true })
  @IsArray()
  @IsNotEmpty()
  ids: number[];
}
