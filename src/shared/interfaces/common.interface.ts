export interface IResult<T> {
  statusCode: number;
  message: string;
  data?: T;
}
export interface ITokenPayload {
  userId: number;
}
