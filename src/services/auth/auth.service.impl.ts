import { HttpException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleRepository } from 'src/data/repositories/role/role.repository';
import { UserRepository } from 'src/data/repositories/user/user.repository';
import { RegisterUserDto } from 'src/common/dtos/user/register-user.dto';
import { ShortUserDto, UserDto } from 'src/common/dtos/user/user.dto';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from 'src/common/dtos/user/login-response.dto';

const SALT_ROUNDS = 10;

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

    const isMatch = await bcrypt.compare(password, userDoc.passwordHash);
    if (!isMatch) {
      return null;
    }

    return UserDto.fromDocument(userDoc);
  }

  async signUp(registerUserDto: RegisterUserDto): Promise<UserDto> {
    const passHash = await bcrypt.hash(registerUserDto.password, SALT_ROUNDS);

    const createdUserDoc = await this.userRepository.createUser({
      username: registerUserDto.username,
      passwordHash: passHash,
      role: 'user',
    });

    return UserDto.fromDocument(createdUserDoc);
  }

  async login(user: ShortUserDto): Promise<LoginResponseDto> {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
