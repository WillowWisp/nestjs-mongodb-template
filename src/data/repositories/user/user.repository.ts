import { Injectable } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { UserDocument } from 'src/data/schemas/user.schema';

@Injectable()
export abstract class UserRepository {
  abstract getUserByUsername(username: string): Promise<UserDocument | null>;
  abstract createUser(args: {
    username: string;
    passwordHash: string;
    role: Role;
  }): Promise<UserDocument>;
}
