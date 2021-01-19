import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../models/user.model';

export const AuthUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request?.user;
  },
);
