import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from 'src/dtos/role/create-role.dto';
import { RoleDto } from 'src/dtos/role/role.dto';

@Injectable()
export abstract class RoleService {
  abstract createRole(createDto: CreateRoleDto): Promise<RoleDto>;
  abstract setRoleAsDefault(id: string): Promise<RoleDto>;
}
