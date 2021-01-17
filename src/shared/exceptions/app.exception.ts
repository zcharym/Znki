import { BadRequestException } from '@nestjs/common';
import { APP_ERROR } from '../consts/common.const';

export class AppException extends BadRequestException {

  constructor(message?: string | Record<string, any>, error?: string) {
    if (message) {
      super(message, error);
    } else {
      super(APP_ERROR.UNKNOWN);
    }
  }
}
