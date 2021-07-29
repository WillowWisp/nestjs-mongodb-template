import { ApiProperty } from '@nestjs/swagger';
import { Role, roleList } from 'src/common/enums/role.enum';
import { UserDocument } from 'src/data/schemas/user.schema';

export class ShortUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;
}

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ enum: roleList })
  role: Role;

  static fromDocument(document: UserDocument): UserDto {
    return {
      id: document.id,
      username: document.username,
      role: document.role,
    };
  }
}
