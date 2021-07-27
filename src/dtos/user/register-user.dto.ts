import { Role, RoleDocument } from 'src/data/schemas/role.schema';
import { User } from 'src/data/schemas/user.schema';
import { RoleDto } from '../role/role.dto';

export class RegisterUserDto {
  username: string;
  password: string;

  toEntity(defaultRole: RoleDocument): User {
    return {
      username: this.username,
      password: this.password,
      role: defaultRole,
    };
  }
}