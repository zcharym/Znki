import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BaseTagDto {
  @ApiProperty({ type: String, description: 'tag name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Number, description: 'tag parent id' })
  @IsNumber()
  @IsNotEmpty()
  pid: number;
}
export class CreateTagDto {
  @ApiProperty({ type: Number, description: 'tag parent id' })
  @IsNumber()
  @IsNotEmpty()
  cardId: number;

  @ApiProperty({ type: BaseTagDto, description: 'tag info' })
  @Type(() => BaseTagDto)
  @ValidateNested()
  tag: BaseTagDto;
}
