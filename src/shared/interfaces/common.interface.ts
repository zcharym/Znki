import { Request } from 'express';
import { User } from '../../models/user.model';

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
