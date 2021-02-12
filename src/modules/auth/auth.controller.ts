import { Response } from 'express';

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UniRes } from '../../shared/class/uni-res.class';
import { LoginDto } from '../user/dto/login.dto';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JWTGuard } from './jwt.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  /**
   * verifying JSON Web Tokens and returning user data
   */
  @Get('/token')
  @UseGuards(JWTGuard)
  public async verifyToken(@Req() req: any) {
    return req.user;
  }

  @Post('/login')
  @ApiOperation({ description: 'user login' })
  @ApiCreatedResponse({ type: LoginDto })
  public async login(@Body() body: LoginDto, @Res() res: Response) {
    const user = await this.userService.validateUser(body.email, body.pwd);
    const cookie = this.authService.getCookieWithJwtToken(user.uid);
    res.setHeader('Set-Cookie', cookie);
    res.send(UniRes.ok(user));
  }

  @Post('/register')
  async register(@Body() body: RegisterUserDto) {
    const user = await this.userService.findOneByEmail(body.email);
    if (user) {
      throw new BadRequestException('user already registered');
    }
    await this.userService.createUser(body);
  }

  @Post('logout')
  @ApiOperation({ description: 'user logout' })
  public logout(@Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return res.send(UniRes.success());
  }
}
