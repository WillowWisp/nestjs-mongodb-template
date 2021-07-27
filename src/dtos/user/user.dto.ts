import { plainToClass } from 'class-transformer';
import { RoleDocument } from 'src/data/schemas/role.schema';
import { UserDocument } from 'src/data/schemas/user.schema';
import { RoleDto } from '../role/role.dto';

export class UserDto {
  id: string;
  username: string;
  role: RoleDto;

  static fromDocument(document: UserDocument, roleDocument: RoleDocument) {
    return {
      id: document.id,
      username: document.username,
      role: RoleDto.fromDocument(roleDocument),
    };
  }
}
