import { Inject } from '@nestjs/common';
import { TodoRepository } from 'src/data/repositories/todo/todo.repository';
import { TodoDto } from 'src/common/dtos/todo/todo.dto';
import { WriteTodoDto } from 'src/common/dtos/todo/write-todo.dto';
import { TodoService } from './todo.service';

export class TodoServiceImpl implements TodoService {
  constructor(@Inject(TodoRepository) private todoRepository: TodoRepository) {}

  async getTodoList(): Promise<TodoDto[]> {
    const todoDocList = await this.todoRepository.getTodoList();
    return todoDocList.map((doc) => TodoDto.fromDocument(doc));
  }

  async getTodoById(id: string): Promise<TodoDto | null> {
    const todoDoc = await this.todoRepository.getTodoById(id);
    return todoDoc ? TodoDto.fromDocument(todoDoc) : null;
  }

  async createTodo(writeDto: WriteTodoDto, userId: string): Promise<TodoDto> {
    const todoDoc = await this.todoRepository.createTodo(writeDto, userId);
    return TodoDto.fromDocument(todoDoc);
  }

  async updateTodo(
    id: string,
    writeDto: WriteTodoDto,
    userId: string,
  ): Promise<TodoDto | null> {
    const todoDoc = await this.todoRepository.updateTodo(id, writeDto, userId);
    return todoDoc ? TodoDto.fromDocument(todoDoc) : null;
  }
}
