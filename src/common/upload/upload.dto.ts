import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UploadTypeENum } from '../../shared/consts/common.const';

export class UploadDto {
  @ApiProperty({ enum: UploadTypeENum })
  @IsEnum(UploadTypeENum)
  action: UploadTypeENum;
}
