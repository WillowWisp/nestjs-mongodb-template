import { Todo } from 'src/data/schemas/todo.schema';

export class WriteTodoDto {
  name: string;

  toEntity(): Todo {
    return {
      name: this.name,
    };
  }
}
