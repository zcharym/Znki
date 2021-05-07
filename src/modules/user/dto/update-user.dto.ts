import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUrl, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UpdateUserDto implements Partial<User> {
  @ApiProperty({ type: String })
  @IsString()
  uid: string;
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  username?: string;
  @ApiPropertyOptional({ type: String })
  @IsUrl()
  @IsOptional()
  avatar?: string;
}
