import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Document & Todo;

@Schema({ collection: 'todos' })
export class Todo {
  @Prop()
  name: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
