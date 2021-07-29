import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role, roleList } from 'src/common/enums/role.enum';

export type UserDocument = Document & User;

@Schema({ collection: 'users' })
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    type: String,
    enum: roleList,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User).plugin(
  require('mongoose-autopopulate'),
);
