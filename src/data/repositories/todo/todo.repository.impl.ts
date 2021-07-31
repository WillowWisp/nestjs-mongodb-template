import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WriteTodoDto } from 'src/common/dtos/todo/write-todo.dto';
import { AppExceptionInternal } from 'src/common/exceptions/app-exception-internal';
import { Todo, TodoDocument } from 'src/data/schemas/todo.schema';
import { User, UserDocument } from 'src/data/schemas/user.schema';
import { TodoRepository } from './todo.repository';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getTodoList(userId: string): Promise<TodoDocument[]> {
    const userDoc = await this.userModel.findById(userId);

    return await this.todoModel.find({ user: userDoc });
  }

  async getTodoById(id: string, userId: string): Promise<TodoDocument | null> {
    const todoDoc = await this.todoModel.findById(id);

    if (todoDoc == null) {
      return null;
    }

    if (todoDoc.user?.id !== userId) {
      return null;
    }

    return todoDoc;
  }

  async createTodo(
    writeDto: WriteTodoDto,
    userId: string,
  ): Promise<TodoDocument> {
    const userDoc = await this.userModel.findById(userId);

    if (userDoc == null) {
      throw new AppExceptionInternal('todo/user-ref-not-found');
    }

    return await this.todoModel.create({
      name: writeDto.name,
      user: userDoc._id,
    } as Todo);
  }

  async updateTodo(
    id: string,
    writeDto: WriteTodoDto,
    userId: string,
  ): Promise<TodoDocument | null> {
    const userDoc = await this.userModel.findById(userId);

    if (userDoc == null) {
      throw new AppExceptionInternal('todo/user-ref-not-found');
    }

    const updatedDoc = await this.todoModel.findByIdAndUpdate(
      id,
      {
        name: writeDto.name,
        user: userDoc._id,
      },
      { new: true },
    );

    if (updatedDoc == null) {
      return null;
    }

    return updatedDoc;
  }
}
