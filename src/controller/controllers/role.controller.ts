import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/common/dtos/role/create-role.dto';
import { RoleService } from 'src/services/role/role.service';
import { AppRoles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@AppRoles('admin')
@ApiTags('Roles')
@ApiBearerAuth()
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  async createRole(@Body() createDto: CreateRoleDto) {
    return await this.roleService.createRole(createDto);
  }

  @Put('set-default/:id')
  async setRoleAsDefault(@Param('id') id: string) {
    return await this.roleService.setRoleAsDefault(id);
  }
}
