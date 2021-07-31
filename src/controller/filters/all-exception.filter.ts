import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppException } from 'src/common/exceptions/app-exception';
import { logError } from 'src/common/utils/logging.utils';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    try {
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      logError(request.url, exception.toString());
      response.status(status).json(
        new AppException({
          status: status,
          message: exception.message || 'unknown',
          detailMessage: exception.response || 'unknown',
        }),
      );
    } catch (error) {
      logError('Catch all exception', JSON.stringify(error));
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
        new AppException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'unknown',
          detailMessage: exception.error || 'unknown',
        }),
      );
    }
  }
}
