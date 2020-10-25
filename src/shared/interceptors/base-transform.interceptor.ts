import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, retry, tap } from 'rxjs/operators';

@Injectable()
export class BaseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const http = context.switchToHttp();
        const res = http.getResponse();

        if (res.statusCode === HttpStatus.CREATED) {
          return {
            message: 'created successfully',
          };
        }
        // TODO implement res with different status code
        return { data };
      }),
    );
  }
}
