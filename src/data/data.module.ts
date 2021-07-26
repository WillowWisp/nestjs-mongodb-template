import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoRepository } from './repositories/todo/todo.repository';
import { TodoRepositoryImpl } from './repositories/todo/todo.repository.impl';
import { UserRepository } from './repositories/user/user.repository';
import { UserRepositoryImpl } from './repositories/user/user.repository.impl';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/shekels-test', {
      useFindAndModify: false,
    }),
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    {
      provide: TodoRepository,
      useClass: TodoRepositoryImpl,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [TodoRepository, UserRepository],
})
export class DataModule {}
