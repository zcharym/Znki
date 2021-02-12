import { User } from '@prisma/client';
import { Request } from 'express';

export interface IResult<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface ITokenPayload {
  userId: string;
}

export interface IRequest extends Request {
  user: User;
}
