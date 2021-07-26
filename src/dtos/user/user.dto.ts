import { UserDocument } from 'src/data/schemas/user.schema';

export class UserDto {
  id: string;
  username: string;

  constructor(args: { id: string; username: string }) {
    this.id = args.id;
    this.username = args.username;
  }

  static fromDocument(document: UserDocument) {
    return new UserDto({
      id: document.id,
      username: document.username,
    });
  }
}
