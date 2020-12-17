import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CommonResponseDto<T> {
  @ApiProperty({ type: String })
  @Expose()
  message: string;
  @ApiProperty({ type: Number })
  @Expose()
  code: number;
  @ApiProperty()
  @Expose()
  data: T;
}

// TODO: add detailed response in swagger api.

export class CommonListDto<T> {
  @ApiProperty()
  data: T;
  @ApiProperty({ type: Number })
  count: number;
  @ApiProperty({ type: Number })
  total: number;
  @ApiProperty({ type: Number })
  page: number;
  @ApiProperty({ type: Number })
  pageCount: number;
}


