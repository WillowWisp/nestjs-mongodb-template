import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ServiceModule } from 'src/services/service.module';
import { JwtStrategy } from './guards/jwt.strategy';
import { LocalStrategy } from './guards/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { TodoController } from './controllers/todo.controller';
import { AppValidationPipe } from './pipes/app-validation.pipe';
import { RoleController } from './controllers/role.controller';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [ServiceModule],
  controllers: [AuthController, TodoController, RoleController],
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
