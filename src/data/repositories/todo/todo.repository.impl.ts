import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoDto } from 'src/dtos/todo/todo.dto';
import { Todo, TodoDocument } from 'src/data/schemas/todo.schema';
import { TodoRepository } from './todo.repository';
import { WriteTodoDto } from 'src/dtos/todo/write-todo.dto';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async getTodoList(): Promise<TodoDto[]> {
    const todoDocList = await this.todoModel.find();
    return todoDocList.map((doc) => TodoDto.fromDocument(doc));
  }

  async getTodoById(id: string): Promise<TodoDto | null> {
    const todoDoc = await this.todoModel.findById(id);

    if (todoDoc == null) {
      return null;
    }

    return TodoDto.fromDocument(todoDoc);
  }

  async createTodo(writeDto: WriteTodoDto): Promise<TodoDto> {
    const createdDoc = await this.todoModel.create(writeDto.toEntity());
    return TodoDto.fromDocument(createdDoc);
  }

  async updateTodo(
    id: string,
    writeDto: WriteTodoDto,
  ): Promise<TodoDto | null> {
    const updatedDoc = await this.todoModel.findByIdAndUpdate(
      id,
      writeDto.toEntity(),
      { new: true },
    );

    if (updatedDoc == null) {
      return null;
    }

    return TodoDto.fromDocument(updatedDoc);
  }
}
