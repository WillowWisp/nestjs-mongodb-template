import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/data/schemas/role.schema';
import { User, UserDocument } from 'src/data/schemas/user.schema';
import { RoleDto } from 'src/dtos/role/role.dto';
import { RegisterUserDto } from 'src/dtos/user/register-user.dto';
import { UserDto } from 'src/dtos/user/user.dto';
import { UserRepository } from './user.repository';

export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(
    registerUserDto: RegisterUserDto,
    defaultRole: RoleDocument,
  ): Promise<UserDto> {
    const foundUserDoc = await this.userModel.findOne({
      username: registerUserDto.username,
    });

    if (foundUserDoc != null) {
      throw new HttpException('Username already taken', 400);
    }

    const createdUserDoc = await this.userModel.create(
      registerUserDto.toEntity(defaultRole),
    );

    return UserDto.fromDocument(createdUserDoc, defaultRole);
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    const roleKey: keyof UserDocument = 'role';

    const userDoc = await this.userModel
      .findOne({ username: username })
      .populate(roleKey);

    if (userDoc == null) {
      return null;
    }

    if (userDoc.password !== password) {
      return null;
    }

    console.log(userDoc.role);

    return UserDto.fromDocument(userDoc, userDoc.role as RoleDocument);
  }
}
