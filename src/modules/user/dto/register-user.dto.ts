import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { baseEncrypt } from '../../../shared/utils/encrypt.util';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'username cant be empty' })
  readonly username: string;
  @ApiProperty()
  @IsEmail({}, { message: 'email is not correct' })
  readonly email: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'pwd cant be empty' })
  @IsString()
  @Transform(val => baseEncrypt(val))
  readonly pwd: string;
}
