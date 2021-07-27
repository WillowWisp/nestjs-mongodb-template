import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { appJwtSecret } from 'src/app-constants';
import { UserDto } from 'src/dtos/user/user.dto';
import { StrategyConstants } from './strategy-constants';
import { plainToClass } from 'class-transformer';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  StrategyConstants.jwtStrategy,
) {
  constructor() {
    super({
      secretOrKey: appJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
    });
  }

  async validate(payload: any) {
    return plainToClass(UserDto, {
      id: payload.sub,
      username: payload.username,
    });
  }
}
