import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
@UseGuards(JWTGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Put()
  @ApiOperation({ summary: 'update user info' })
  async updateUser(@Body() body: UpdateUserDto) {
    return this.userService.updateUserInfo(body);
  }
}
