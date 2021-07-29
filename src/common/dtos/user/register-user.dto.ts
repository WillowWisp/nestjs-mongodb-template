import { Role, RoleDocument } from 'src/data/schemas/role.schema';
import { User } from 'src/data/schemas/user.schema';
import { RoleDto } from '../role/role.dto';

export class RegisterUserDto {
  username: string;
  password: string;
}
