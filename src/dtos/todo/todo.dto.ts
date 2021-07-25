import { TodoDocument } from 'src/data/schemas/todo.schema';

export class TodoDto {
  id: string;
  name: string;

  constructor(args: { id: string; name: string }) {
    this.id = args.id;
    this.name = args.name;
  }

  static fromDocument(document: TodoDocument) {
    return new TodoDto({
      id: document.id,
      name: document.name,
    });
  }
}
