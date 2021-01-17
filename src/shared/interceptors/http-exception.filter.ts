import {
    ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { status, json } = this.prepareException(exception);

    response.status(status).send(json);
  }

  prepareException(exc: any): { status: number; json: unknown } {
    const error =
      exc instanceof HttpException
        ? exc
        : new InternalServerErrorException(exc.message);
    const status = error.getStatus();
    const response = error.getResponse();
    const json = typeof response === 'string' ? { error: response } : response;

    return { status, json };
  }
}
