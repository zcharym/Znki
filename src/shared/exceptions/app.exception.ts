import { BadRequestException } from '@nestjs/common';
import { AppErrorEnum } from '../consts/common.const';

export class AppException extends BadRequestException {

  constructor(message?: string | Record<string, any>, error?: string) {
    if (message) {
      super(message, error);
    } else {
      super(AppErrorEnum.UNKNOWN);
    }
  }
}
