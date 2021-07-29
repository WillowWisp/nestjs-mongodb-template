import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleRepository } from 'src/data/repositories/role/role.repository';
import { UserRepository } from 'src/data/repositories/user/user.repository';
import { CreateRoleDto } from 'src/common/dtos/role/create-role.dto';
import { RoleDto } from 'src/common/dtos/role/role.dto';
import { RegisterUserDto } from 'src/common/dtos/user/register-user.dto';
import { UserDto } from 'src/common/dtos/user/user.dto';
import { RoleService } from './role.service';

export class RoleServiceImpl implements RoleService {
  constructor(@Inject(RoleRepository) private roleRepository: RoleRepository) {}

  async createRole(createDto: CreateRoleDto): Promise<RoleDto> {
    return await this.roleRepository.createRole(createDto);
  }

  async setRoleAsDefault(id: string): Promise<RoleDto> {
    return await this.roleRepository.setRoleAsDefault(id);
  }
}
