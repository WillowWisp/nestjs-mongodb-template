import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/data/schemas/user.schema';
import { UserDto } from 'src/dtos/user/user.dto';
import { UserRepository } from './user.repository';

export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  users = [
    {
      username: 'hello',
      password: 'world',
    },
  ];

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    // const userDoc = await this.userModel.findOne({ username: username });

    // if (userDoc == null) {
    //   return null;
    // }

    // if (userDoc.password !== password) {
    //   return null;
    // }

    // return UserDto.fromDocument(userDoc);

    return new UserDto({
      id: '123123',
      ...this.users[0],
    });
  }
}
