import { TodoDocument } from 'src/data/schemas/todo.schema';
import { UserDto } from '../user/user.dto';

export class TodoDto {
  id: string;
  name: string;
  user: UserDto | null;

  static fromDocument(document: TodoDocument): TodoDto {
    return {
      id: document.id,
      name: document.name,
      user: !document.user ? null : UserDto.fromDocument(document.user),
    };
  }
}
