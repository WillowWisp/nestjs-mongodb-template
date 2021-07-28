import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { OmitStrict } from 'src/common/utils/omit-strict';
import { Role, RoleDocument } from './role.schema';

export type UserDocument = Document &
  OmitStrict<User, 'role'> & {
    role: RoleDocument;
  };

@Schema({ collection: 'users' })
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Role.name,
    autopopulate: true,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User).plugin(
  require('mongoose-autopopulate'),
);
