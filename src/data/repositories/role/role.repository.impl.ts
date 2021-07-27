import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDto } from 'src/dtos/role/role.dto';
import { Role, RoleDocument } from 'src/data/schemas/role.schema';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from 'src/dtos/role/create-role.dto';
import { HttpException } from '@nestjs/common';

export class RoleRepositoryImpl implements RoleRepository {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async createRole(createDto: CreateRoleDto): Promise<RoleDto> {
    const createdDoc = await this.roleModel.create(createDto.toEntity());
    return RoleDto.fromDocument(createdDoc);
  }

  async setRoleAsDefault(id: string): Promise<RoleDto> {
    const updatedDoc = await this.roleModel.findByIdAndUpdate(
      id,
      { isDefault: true },
      { new: true },
    );

    if (updatedDoc == null) {
      throw new HttpException('Role not found', 400);
    }

    // Set all remaining roles' isDefault to false
    await this.roleModel.updateMany({ _id: { $ne: id } }, { isDefault: false });

    return RoleDto.fromDocument(updatedDoc);
  }

  async getDefaultRole(): Promise<RoleDocument> {
    const foundRoleDoc = await this.roleModel.findOne({ isDefault: true });

    if (foundRoleDoc == null) {
      throw new HttpException('Default role not found', 400);
    }

    return foundRoleDoc;
  }
}
