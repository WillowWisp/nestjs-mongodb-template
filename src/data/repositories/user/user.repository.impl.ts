import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDocument } from 'src/data/schemas/role.schema';
import { User, UserDocument } from 'src/data/schemas/user.schema';
import { UserRepository } from './user.repository';

export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserByUsername(username: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ username: username });
  }

  async createUser(args: {
    username: string;
    password: string;
    roleObjId: RoleDocument['_id'];
  }): Promise<UserDocument> {
    const createdUserDoc = await this.userModel.create({
      username: args.username,
      password: args.password,
      role: args.roleObjId,
    });

    return createdUserDoc;
  }
}
