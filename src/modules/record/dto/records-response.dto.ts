import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CommonListDto, CommonResponseDto } from '../../../shared/interfaces/common-response.dto';
import { Group, Tag } from '../../../model';

export class RecordDto {
  @ApiProperty({ type: String })
  zKey: string;
  @ApiProperty({ type: String })
  zValue: string;
  @ApiProperty({ type: Number })
  priority: number;
  @ApiProperty({ type: Number })
  groupId: number;
  @ApiProperty({ type: Boolean })
  isRemembered: boolean;
  @ApiProperty({ type: [Tag] })
  @Type(() => Tag)
  tags: Tag[];
  @ApiProperty({ type: Group })
  @Type(() => Group)
  group: Group;
}

export class RecordsResponseDto extends CommonResponseDto<CommonListDto<RecordDto[]>> {
  @ApiProperty({ type: CommonListDto })
  @Type(() => CommonListDto)
  data: CommonListDto<RecordDto[]>;
}

