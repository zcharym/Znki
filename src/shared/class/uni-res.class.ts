import { ResultMessageEnum } from '../consts/common.const';
import { IResult } from '../interfaces';

export class UniRes<T> implements IResult<T> {
  statusCode: number;
  message: string;
  data?: T;

  public static ok<T>(data: T): IResult<T> {
    return {
      statusCode: 200,
      message: ResultMessageEnum.SUCCESS,
      data,
    };
  }

  public static success(): IResult<void> {
    return {
      statusCode: 200,
      message: ResultMessageEnum.SUCCESS,
    };
  }

  public static fail(message: string, statusCode?: number): IResult<null> {
    return {
      statusCode: statusCode || 500,
      message: ResultMessageEnum.FAIL,
      data: null,
    };
  }

  public static created(id?: string): IResult<string> {
    return {
      statusCode: 201,
      message: ResultMessageEnum.SUCCESS,
      data: id || '',
    };
  }
}
