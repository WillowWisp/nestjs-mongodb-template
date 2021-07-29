import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';

export const ROLES_KEY = 'roleKey';
export const AppRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
