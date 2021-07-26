import { Injectable } from '@nestjs/common';
import { WriteTodoDto } from 'src/dtos/todo/write-todo.dto';
import { TodoDto } from 'src/dtos/todo/todo.dto';
import { UserDto } from 'src/dtos/user/user.dto';

@Injectable()
export abstract class UserRepository {
  abstract validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null>;
}
