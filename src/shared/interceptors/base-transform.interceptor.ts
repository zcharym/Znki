import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EResultMessage, IResult } from '../interface/ common.interface';

@Injectable()
export class BaseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResult<any>> {
    return next.handle().pipe(
      map(data => {
        const http = context.switchToHttp();
        const res = http.getResponse();

        if (res.statusCode === HttpStatus.CREATED) {
          return {
            code: 201,
            message: 'created successfully',
          };
        }
        // TODO implement res with different status code
        return {
          data,
          message: EResultMessage.SUCCESS,
          code: 200,
        };
      }),
    );
  }
}
