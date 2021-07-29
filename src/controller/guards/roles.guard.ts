import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ShortUserDto } from 'src/common/dtos/user/user.dto';
import { Role } from 'src/common/enums/role.enum';
import { logError } from 'src/common/utils/logging.utils';
import { AuthService } from 'src/services/auth/auth.service';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(AuthService) private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const shortUser = request.user as ShortUserDto;

    if (!shortUser) {
      logError(
        'DEV FAULT',
        'user is missing from request. This is likely because JwtAuthGuard is missing.' +
          ' Remember to put JwtAuthGuard before RolesGuard.',
      );
      throw new InternalServerErrorException();
    }

    // TODO consider using claim to increase performance
    const user = await this.authService.getUserByUsername(shortUser.username);

    return requiredRoles.some((role) => user.role === role);
  }
}
