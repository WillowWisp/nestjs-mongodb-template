import { ApiProperty } from '@nestjs/swagger';
import { RoleDocument } from 'src/data/schemas/role.schema';

export class RoleDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isDefault: boolean;

  static fromDocument(document: RoleDocument) {
    return {
      id: document.id,
      name: document.name,
      isDefault: document.isDefault,
    };
  }
}
