import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ShortUserDto } from 'src/common/dtos/user/user.dto';

export const AppUser = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as ShortUserDto;
  },
);
