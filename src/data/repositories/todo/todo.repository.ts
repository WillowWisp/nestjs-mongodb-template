import { Injectable } from '@nestjs/common';
import { WriteTodoDto } from 'src/common/dtos/todo/write-todo.dto';
import { TodoDto } from 'src/common/dtos/todo/todo.dto';
import { TodoDocument } from 'src/data/schemas/todo.schema';

@Injectable()
export abstract class TodoRepository {
  abstract getTodoList(): Promise<TodoDocument[]>;
  abstract getTodoById(id: string): Promise<TodoDocument | null>;

  abstract createTodo(
    writeDto: WriteTodoDto,
    userId: string,
  ): Promise<TodoDocument>;

  abstract updateTodo(
    id: string,
    writeDto: WriteTodoDto,
    userId: string,
  ): Promise<TodoDocument | null>;
}
