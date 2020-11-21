import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { CommonResponseDto } from '../../../shared/interface/common-response.dto';
import { Record } from '../../../model';

@Exclude()
export class RecordsResponseDto extends CommonResponseDto<Record[]> {
  @ApiProperty({ type: [Record] })
  @Expose()
  data: Record[];
}



