import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { baseEncrypt } from '../../../shared/utils/encrypt.util';

export class LoginDto {
  @IsString()
  @Transform(val => baseEncrypt(val))
  @ApiProperty({ type: String, description: 'password' })
  pwd: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  mail: string;
}
