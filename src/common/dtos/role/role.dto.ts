import { RoleDocument } from 'src/data/schemas/role.schema';

export class RoleDto {
  id?: string;
  name: string;
  isDefault: boolean;

  static fromDocument(document: RoleDocument) {
    return {
      id: document.id,
      name: document.name,
      isDefault: document.isDefault,
    };
  }
}
