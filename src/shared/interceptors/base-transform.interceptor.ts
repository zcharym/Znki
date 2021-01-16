import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor
} from '@nestjs/common';

import { UniRes } from '../class/uni-res.class';
import { IResult } from '../interfaces/ common.interface';

@Injectable()
export class BaseTransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResult<any>> {
    return next.handle().pipe(
      map(data => {
        const http = context.switchToHttp();
        const res = http.getResponse();

        if (res.statusCode === HttpStatus.CREATED) {
          return UniRes.created(data);
        }
        // TODO implement res with different status code
        return UniRes.ok(data);
      }),
    );
  }
}
