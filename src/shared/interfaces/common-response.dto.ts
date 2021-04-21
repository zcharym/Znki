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
