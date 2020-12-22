import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ type: String, description: 'tag name' })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, description: 'tag type', default: 0 })
  @IsNumber()
  type: number;
}
