import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';
import { OmitStrict } from 'src/common/utils/omit-strict';
import { User, UserDocument } from './user.schema';

export type TodoDocument = Document &
  OmitStrict<Todo, 'user'> & {
    user: UserDocument | null;
  };

@Schema({ collection: 'todos' })
export class Todo {
  @Prop()
  name: string;

  @Prop({
    type: MSchema.Types.ObjectId,
    ref: User.name,
    autopopulate: true,
  })
  user: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
