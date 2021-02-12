import { User } from '@prisma/client';
import { Request } from 'express';

export interface IResult<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface ITokenPayload {
  userId: number;
}

export interface IRequest extends Request {
  user: User;
}
