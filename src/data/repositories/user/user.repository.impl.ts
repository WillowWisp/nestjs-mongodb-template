import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/common/enums/role.enum';
import { User, UserDocument } from 'src/data/schemas/user.schema';
import { UserRepository } from './user.repository';

export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserByUsername(username: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ username: username });
  }

  async createUser(args: {
    username: string;
    passwordHash: string;
    role: Role;
  }): Promise<UserDocument> {
    const createdUserDoc = await this.userModel.create({
      username: args.username,
      passwordHash: args.passwordHash,
      role: args.role,
    } as User);

    return createdUserDoc;
  }
}
