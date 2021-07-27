import { Injectable } from '@nestjs/common';
import { Role, RoleDocument } from 'src/data/schemas/role.schema';
import { CreateRoleDto } from 'src/dtos/role/create-role.dto';
import { RoleDto } from 'src/dtos/role/role.dto';

@Injectable()
export abstract class RoleRepository {
  abstract createRole(createDto: CreateRoleDto): Promise<RoleDto>;
  abstract setRoleAsDefault(id: string): Promise<RoleDto>;
  abstract getDefaultRole(): Promise<RoleDocument>;
}
