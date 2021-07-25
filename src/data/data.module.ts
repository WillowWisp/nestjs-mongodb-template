import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoRepository } from './repositories/todo/todo.repository';
import { TodoRepositoryImpl } from './repositories/todo/todo.repository.impl';
import { Todo, TodoSchema } from './schemas/todo.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/shekels-test', {
      useFindAndModify: false,
    }),
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  providers: [
    {
      provide: TodoRepository,
      useClass: TodoRepositoryImpl,
    },
  ],
  exports: [TodoRepository],
})
export class DataModule {}
