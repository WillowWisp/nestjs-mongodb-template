import { Role } from 'src/data/schemas/role.schema';

export class CreateRoleDto {
  name: string;

  toEntity(): Role {
    return {
      name: this.name,
      isDefault: false,
    };
  }
}
