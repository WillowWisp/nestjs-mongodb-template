import { Injectable } from '@nestjs/common';
import { RoleDocument } from 'src/data/schemas/role.schema';
import { UserDocument } from 'src/data/schemas/user.schema';

@Injectable()
export abstract class UserRepository {
  abstract getUserByUsername(username: string): Promise<UserDocument | null>;
  abstract createUser(args: {
    username: string;
    password: string;
    roleObjId: RoleDocument['_id'];
  }): Promise<UserDocument>;
}
