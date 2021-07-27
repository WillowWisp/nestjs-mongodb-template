import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({ collection: 'roles' })
export class Role {
  @Prop()
  name: string;

  @Prop()
  isDefault: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
