import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @ApiOperation({ description: 'user register' })
  @ApiCreatedResponse({ type: CreateUserDto })
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() body: CreateUserDto) {
    await this.userService.createUser(body);
  }

  @Post('/login')
  @ApiOperation({ description: 'user login' })
  @ApiCreatedResponse({ type: LoginDto })
  @HttpCode(HttpStatus.OK)
  public async login() {}

  @Post('logout')
  @ApiOperation({ description: 'user logout' })
  public logout() {}
}
