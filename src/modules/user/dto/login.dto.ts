import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { baseEncrypt } from '../../../shared/utils/encrypt.util';

export class LoginDto {
  @Transform(val => baseEncrypt(val))
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  pwd: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  @Transform((val: string) => val.toLowerCase())
  email: string;
}
