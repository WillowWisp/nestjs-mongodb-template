import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role, RoleDocument } from './role.schema';

export type UserDocument = User &
  Document & {
    role: RoleDocument;
  };

@Schema({ collection: 'users' })
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
