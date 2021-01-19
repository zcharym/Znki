import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JWTGuard } from '../auth/jwt.guard';

@ApiTags('User')
@Controller('user')
@UseGuards(JWTGuard)
export class UserController {}
