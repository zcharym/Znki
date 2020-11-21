import { ApiProperty } from '@nestjs/swagger';

export class CreateRecordDto {
  @ApiProperty({ type: String, description: 'znki key(question)' })
  zKey: string;

  @ApiProperty({ type: String, description: 'znki value(answer)' })
  zValue: string;
}
