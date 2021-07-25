import { Inject } from '@nestjs/common';
import { TodoRepository } from 'src/data/repositories/todo/todo.repository';
import { TodoDto } from 'src/dtos/todo/todo.dto';
import { WriteTodoDto } from 'src/dtos/todo/write-todo.dto';
import { TodoService } from './todo.service';

export class TodoServiceImpl implements TodoService {
  constructor(@Inject(TodoRepository) private todoRepository: TodoRepository) {}

  async getTodoList(): Promise<TodoDto[]> {
    return await this.todoRepository.getTodoList();
  }

  async getTodoById(id: string): Promise<TodoDto | null> {
    return await this.todoRepository.getTodoById(id);
  }

  async createTodo(writeDto: WriteTodoDto): Promise<TodoDto> {
    return await this.todoRepository.createTodo(writeDto);
  }

  async updateTodo(
    id: string,
    writeDto: WriteTodoDto,
  ): Promise<TodoDto | null> {
    return await this.todoRepository.updateTodo(id, writeDto);
  }
}
