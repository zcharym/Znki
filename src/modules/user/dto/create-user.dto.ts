import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { baseEncrypt } from '../../../shared/utils/encrypt.util';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @IsString()
  @Transform(val => baseEncrypt(val))
  @ApiProperty({ type: String, description: 'password' })
  pwd: string;

  @IsString()
  @ApiProperty({ type: String, description: 'user id' })
  uid: string;
}
