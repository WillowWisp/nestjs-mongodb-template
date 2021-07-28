import { UserDocument } from 'src/data/schemas/user.schema';
import { RoleDto } from '../role/role.dto';

export class ShortUserDto {
  id: string;
  username: string;
}

export class UserDto {
  id: string;
  username: string;
  role: RoleDto | null;

  static async fromDocument(document: UserDocument): Promise<UserDto> {
    return {
      id: document.id,
      username: document.username,
      role: !document.role ? null : RoleDto.fromDocument(document.role),
    };
  }
}
