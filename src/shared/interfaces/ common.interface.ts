export enum ResultMessageEnum {
  SUCCESS = 'success',
  FAIL = 'fail'
}

export interface IResult<T> {
  statusCode: number;
  message: string;
  data?: T;
}
