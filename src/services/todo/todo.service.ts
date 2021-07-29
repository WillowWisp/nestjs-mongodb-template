import { Injectable } from '@nestjs/common';
import { WriteTodoDto } from 'src/common/dtos/todo/write-todo.dto';
import { TodoDto } from 'src/common/dtos/todo/todo.dto';

@Injectable()
export abstract class TodoService {
  abstract getTodoList(userId: string): Promise<TodoDto[]>;
  abstract getTodoById(id: string, userId: string): Promise<TodoDto | null>;
  abstract createTodo(writeDto: WriteTodoDto, userId: string): Promise<TodoDto>;
  abstract updateTodo(
    id: string,
    writeDto: WriteTodoDto,
    userId: string,
  ): Promise<TodoDto | null>;
}
