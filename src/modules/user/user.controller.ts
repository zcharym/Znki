import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {
  }

  @Post('/login')
  @ApiOperation({ description: 'user login' })
  @ApiCreatedResponse({ type: CreateUserDto })
  public async login(
    @Body() body: CreateUserDto,
  ) {
    await this.userService.createUser(body);
  }

  @Post('logout')
  @ApiOperation({ description: 'user logout' })
  public logout() {

  }
}
