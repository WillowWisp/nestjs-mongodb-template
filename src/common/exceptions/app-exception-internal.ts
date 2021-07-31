import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception';

const internalMessages = {
  'todo/user-ref-not-found': {
    detailMessage: 'User ref not found',
  },
} as const;
type InternalMessage = keyof typeof internalMessages;

export class AppExceptionInternal extends AppException {
  constructor(message: InternalMessage) {
    super({
      message: message,
      detailMessage: internalMessages[message].detailMessage,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
