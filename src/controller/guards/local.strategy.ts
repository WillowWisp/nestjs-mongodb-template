import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { StrategyConstants } from './strategy-constants';
import { ShortUserDto } from 'src/dtos/user/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  StrategyConstants.localStrategy,
) {
  constructor(@Inject(AuthService) private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: user.id, username: user.username } as ShortUserDto;
  }
}
