import { Injectable } from '@nestjs/common';
import { WriteTodoDto } from 'src/dtos/todo/write-todo.dto';
import { TodoDto } from 'src/dtos/todo/todo.dto';

@Injectable()
export abstract class TodoService {
  abstract getTodoList(): Promise<TodoDto[]>;
  abstract getTodoById(id: string): Promise<TodoDto | null>;
  abstract createTodo(writeDto: WriteTodoDto): Promise<TodoDto>;
  abstract updateTodo(
    id: string,
    writeDto: WriteTodoDto,
  ): Promise<TodoDto | null>;
}
