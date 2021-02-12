import { ITokenPayload } from 'src/shared/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // async validateUser(email: string, pwd: string): Promise<any> {}

  async login(user: any) {
    const payload: ITokenPayload = {
      userId: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async logout(user: any) {}

  public getCookieWithJwtToken(userId: string): string {
    const payload: ITokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut(): string {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
