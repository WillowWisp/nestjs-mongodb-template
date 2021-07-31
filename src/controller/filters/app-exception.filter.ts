import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { AppException } from 'src/common/exceptions/app-exception';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    console.log('vao ne');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.status;
    response.status(status).json(exception);
  }
}
