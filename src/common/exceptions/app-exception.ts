import { HttpStatus } from '@nestjs/common';

export class AppException {
  status: HttpStatus;
  message: string;
  detailMessage: object | string;

  constructor(args: {
    status: HttpStatus;
    message: string;
    detailMessage: object | string;
  }) {
    this.status = args.status;
    this.message = args.message;
    this.detailMessage = args.detailMessage;
  }
}
