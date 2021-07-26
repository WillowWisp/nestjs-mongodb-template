import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ServiceModule } from 'src/services/service.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { TodoController } from './controllers/todo.controller';
import { AppValidationPipe } from './pipes/app-validation.pipe';

@Module({
  imports: [ServiceModule],
  controllers: [AuthController, TodoController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: AppValidationPipe,
    },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class ControllerModule {}
