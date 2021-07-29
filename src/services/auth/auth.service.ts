import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/common/dtos/user/register-user.dto';
import { ShortUserDto, UserDto } from 'src/common/dtos/user/user.dto';

@Injectable()
export abstract class AuthService {
  abstract getUserByUsername(username: string): Promise<UserDto>;

  abstract validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null>;

  abstract signUp(registerUserDto: RegisterUserDto): Promise<UserDto>;

  abstract login(user: ShortUserDto): Promise<{
    accessToken: string;
  }>;
}
