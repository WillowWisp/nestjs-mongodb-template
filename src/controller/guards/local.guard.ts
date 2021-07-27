import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyConstants } from './strategy-constants';

@Injectable()
export class LocalAuthGuard extends AuthGuard(
  StrategyConstants.localStrategy,
) {}
