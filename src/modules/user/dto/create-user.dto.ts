import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { baseEncrypt } from '../../../shared/utils/encrypt.util';
import { ApiProperty } from '@nestjs/swagger';
import { uuidV4 } from '../../../shared/utils';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ type: String, description: 'username' })
  name: string;

  @IsString()
  @Transform(val => baseEncrypt(val))
  @ApiProperty({ type: String, description: 'password' })
  pwd: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  mail: string;

  @IsString()
  @ApiProperty({ type: String, description: 'user id' })
  @Transform(val => val || uuidV4())
  uid: string;
}
