import { Inject } from '@nestjs/common';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WriteTodoDto } from 'src/dtos/todo/write-todo.dto';
import { TodoDto } from 'src/dtos/todo/todo.dto';
import { TodoService } from 'src/services/todo/todo.service';
import { Put } from '@nestjs/common';

@Controller('todos')
export class TodoController {
  constructor(@Inject(TodoService) private todoService: TodoService) {}

  @Get()
  async getTodoList(): Promise<TodoDto[]> {
    return await this.todoService.getTodoList();
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string): Promise<TodoDto | null> {
    return await this.todoService.getTodoById(id);
  }

  @Post()
  async createTodo(@Body() writeDto: WriteTodoDto): Promise<TodoDto> {
    return await this.todoService.createTodo(writeDto);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() writeDto: WriteTodoDto,
  ): Promise<TodoDto | null> {
    return await this.todoService.updateTodo(id, writeDto);
  }
}
