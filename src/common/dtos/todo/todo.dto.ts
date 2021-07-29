import { ApiProperty } from '@nestjs/swagger';
import { TodoDocument } from 'src/data/schemas/todo.schema';
import { UserDto } from '../user/user.dto';

export class TodoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: UserDto, nullable: true })
  user: UserDto | null;

  static fromDocument(document: TodoDocument): TodoDto {
    return {
      id: document.id,
      name: document.name,
      user: !document.user ? null : UserDto.fromDocument(document.user),
    };
  }
}
