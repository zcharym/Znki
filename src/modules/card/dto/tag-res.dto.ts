import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { CommonResponseDto } from '../../../shared/interfaces/common-response.dto';

// TODO remove TagListDto
export class TagListDto<T> {
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

export class TagDto {
  @ApiProperty({ type: String, description: 'tag name' })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, description: 'tag type', default: 0 })
  @IsNumber()
  type: number;
}

export class TagResDto extends CommonResponseDto<TagListDto<TagDto[]>> {
  @ApiProperty({ type: TagListDto })
  @Type(() => TagListDto)
  data: TagListDto<TagDto[]>;
}
