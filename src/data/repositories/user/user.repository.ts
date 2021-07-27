import { Injectable } from '@nestjs/common';
import { Role, RoleDocument } from 'src/data/schemas/role.schema';
import { RoleDto } from 'src/dtos/role/role.dto';
import { RegisterUserDto } from 'src/dtos/user/register-user.dto';
import { UserDto } from 'src/dtos/user/user.dto';

@Injectable()
export abstract class UserRepository {
  abstract registerUser(
    registerUserDto: RegisterUserDto,
    defaultRole: RoleDocument,
  ): Promise<UserDto>;

  abstract validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null>;
}
