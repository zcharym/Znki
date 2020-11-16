import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min, MinLength } from 'class-validator';

export class CreateRecordDto {
  @ApiProperty({ type: String, description: 'znki key(question)' })
  @IsString()
  @MinLength(1)
  zKey: string;

  @ApiProperty({ type: String, description: 'znki value(answer)' })
  @IsString()
  @MinLength(1)
  zValue: string;
}
