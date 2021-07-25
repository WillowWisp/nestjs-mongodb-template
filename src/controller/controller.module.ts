import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ServiceModule } from 'src/services/service.module';
import { TodoController } from './controllers/todo.controller';
import { AppValidationPipe } from './pipes/app-validation.pipe';

@Module({
  imports: [ServiceModule],
  controllers: [TodoController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: AppValidationPipe,
    },
  ],
})
export class ControllerModule {}
