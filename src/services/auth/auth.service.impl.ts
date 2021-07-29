import { HttpException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleRepository } from 'src/data/repositories/role/role.repository';
import { UserRepository } from 'src/data/repositories/user/user.repository';
import { RegisterUserDto } from 'src/common/dtos/user/register-user.dto';
import { ShortUserDto, UserDto } from 'src/common/dtos/user/user.dto';
import { AuthService } from './auth.service';

export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(UserRepository) private userRepository: UserRepository,
    @Inject(RoleRepository) private roleRepository: RoleRepository,
    private jwtService: JwtService,
  ) {}

  async getUserByUsername(username: string): Promise<UserDto> {
    const userDoc = await this.userRepository.getUserByUsername(username);

    if (userDoc == null) {
      throw new HttpException('User not found', 404);
    }

    return UserDto.fromDocument(userDoc);
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    const userDoc = await this.userRepository.getUserByUsername(username);

    if (userDoc == null) {
      return null;
    }

    if (userDoc.password !== password) {
      return null;
    }

    return UserDto.fromDocument(userDoc);
  }

  async signUp(registerUserDto: RegisterUserDto): Promise<UserDto> {
    const existUserDoc = await this.userRepository.getUserByUsername(
      registerUserDto.username,
    );

    if (existUserDoc != null) {
      throw new HttpException('Username already taken', 400);
    }

    const createdUserDoc = await this.userRepository.createUser({
      username: registerUserDto.username,
      password: registerUserDto.password,
      role: 'user',
    });

    return UserDto.fromDocument(createdUserDoc);
  }

  async login(user: ShortUserDto): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
