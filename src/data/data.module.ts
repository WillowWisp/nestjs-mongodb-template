import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleRepository } from './repositories/role/role.repository';
import { RoleRepositoryImpl } from './repositories/role/role.repository.impl';
import { TodoRepository } from './repositories/todo/todo.repository';
import { TodoRepositoryImpl } from './repositories/todo/todo.repository.impl';
import { UserRepository } from './repositories/user/user.repository';
import { UserRepositoryImpl } from './repositories/user/user.repository.impl';
import { Role, RoleSchema } from './schemas/role.schema';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/shekels-test', {
      useFindAndModify: false,
      connectionFactory: (connection) => {
        // Register plugin for all schemas
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
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
    {
      provide: RoleRepository,
      useClass: RoleRepositoryImpl,
    },
  ],
  exports: [TodoRepository, UserRepository, RoleRepository],
})
export class DataModule {}
