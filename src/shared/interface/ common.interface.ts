export enum EResultMessage {
  SUCCESS = 'success',
  FAIL = 'fail'
}

export interface IResult<T> {
  code: number;
  message: string;
  data?: T;
}
