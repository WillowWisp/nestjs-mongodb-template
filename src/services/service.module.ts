import { Module } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { TodoService } from './todo/todo.service';
import { TodoServiceImpl } from './todo/todo.service.impl';

@Module({
  imports: [DataModule],
  providers: [
    {
      provide: TodoService,
      useClass: TodoServiceImpl,
    },
  ],
  exports: [TodoService],
})
export class ServiceModule {}
