import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import {
  CommonListDto,
  CommonResponseDto,
} from '../../../shared/interfaces/common-response.dto';

export class TagDto {
  @ApiProperty({ type: String, description: 'tag name' })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, description: 'tag type', default: 0 })
  @IsNumber()
  type: number;
}

export class TagResDto extends CommonResponseDto<CommonListDto<TagDto[]>> {
  @ApiProperty({ type: CommonListDto })
  @Type(() => CommonListDto)
  data: CommonListDto<TagDto[]>;
}
