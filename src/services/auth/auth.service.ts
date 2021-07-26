import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dtos/user/user.dto';

@Injectable()
export abstract class AuthService {
  abstract validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null>;

  abstract login(user: any): Promise<{
    accessToken: string;
  }>;
}
