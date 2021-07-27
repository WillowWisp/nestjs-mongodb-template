import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { appJwtSecret } from 'src/app-constants';
import { DataModule } from 'src/data/data.module';
import { AuthService } from './auth/auth.service';
import { AuthServiceImpl } from './auth/auth.service.impl';
import { RoleService } from './role/role.service';
import { RoleServiceImpl } from './role/role.service.impl';
import { TodoService } from './todo/todo.service';
import { TodoServiceImpl } from './todo/todo.service.impl';

@Module({
  imports: [
    DataModule,
    JwtModule.register({
      secret: appJwtSecret,
      signOptions: {},
    }),
  ],
  providers: [
    {
      provide: TodoService,
      useClass: TodoServiceImpl,
    },
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
    {
      provide: RoleService,
      useClass: RoleServiceImpl,
    },
  ],
  exports: [TodoService, AuthService, RoleService],
})
export class ServiceModule {}
