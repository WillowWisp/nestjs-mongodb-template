import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/data/schemas/role.schema';

export class CreateRoleDto {
  @ApiProperty()
  name: string;

  toEntity(): Role {
    return {
      name: this.name,
      isDefault: false,
    };
  }
}
