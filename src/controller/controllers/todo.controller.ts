import { Inject, UseGuards } from '@nestjs/common';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WriteTodoDto } from 'src/common/dtos/todo/write-todo.dto';
import { TodoDto } from 'src/common/dtos/todo/todo.dto';
import { TodoService } from 'src/services/todo/todo.service';
import { Put } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ShortUserDto } from 'src/common/dtos/user/user.dto';
import { AppUser } from '../decorators/app-user.decorator';
import { AppRoles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AppRoles('admin')
  async createTodo(
    @AppUser() user: ShortUserDto,
    @Body() writeDto: WriteTodoDto,
  ): Promise<TodoDto> {
    return await this.todoService.createTodo(writeDto, user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTodo(
    @AppUser() user: ShortUserDto,
    @Param('id') id: string,
    @Body() writeDto: WriteTodoDto,
  ): Promise<TodoDto | null> {
    return await this.todoService.updateTodo(id, writeDto, user.id);
  }
}
