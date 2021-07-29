import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateRoleDto } from 'src/common/dtos/role/create-role.dto';
import { RoleService } from 'src/services/role/role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // async getProfile(@AppUser() user: UserDto) {
  //   return user.username;
  // }

  @Post()
  async createRole(@Body() createDto: CreateRoleDto) {
    return await this.roleService.createRole(createDto);
  }

  @Put('set-default/:id')
  async setRoleAsDefault(@Param('id') id: string) {
    return await this.roleService.setRoleAsDefault(id);
  }
}
