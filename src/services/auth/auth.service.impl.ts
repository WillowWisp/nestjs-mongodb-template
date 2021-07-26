import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/data/repositories/user/user.repository';
import { UserDto } from 'src/dtos/user/user.dto';
import { AuthService } from './auth.service';

export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    return await this.userRepository.validateUser(username, password);
  }

  async login(user: any): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
