import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResult, ResultMessageEnum } from '../interfaces/ common.interface';
import { UniRes } from '../class/uni-res.class';

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
          return {
            statusCode: 201,
            message: 'created successfully',
            data: data || null,
          };
        }
        // TODO implement res with different status code
        return UniRes.ok(data);
      }),
    );
  }
}
