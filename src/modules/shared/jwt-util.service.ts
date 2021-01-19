import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtilService {
  constructor(private jwtService: JwtService) {}

  getPayload(authStr: string) {
    const jwt = authStr.replace('Bearer ', '');
    return this.jwtService.decode(jwt, { json: true });
  }
}
