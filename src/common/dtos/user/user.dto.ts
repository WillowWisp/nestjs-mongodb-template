import { Role } from 'src/common/enums/role.enum';
import { UserDocument } from 'src/data/schemas/user.schema';

export class ShortUserDto {
  id: string;
  username: string;
}

export class UserDto {
  id: string;
  username: string;
  role: Role;

  static fromDocument(document: UserDocument): UserDto {
    return {
      id: document.id,
      username: document.username,
      role: document.role,
    };
  }
}
