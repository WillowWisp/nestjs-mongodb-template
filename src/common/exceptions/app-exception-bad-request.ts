import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception';

const badRequestMessages = {
  'user/username-already-existed': {
    detailMessage: 'This username has already been taken',
  },
} as const;
type BadRequestMessage = keyof typeof badRequestMessages;

export class AppExceptionBadRequest extends AppException {
  constructor(message: BadRequestMessage) {
    super({
      message: message,
      detailMessage: badRequestMessages[message].detailMessage,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
