import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/dtos/user/register-user.dto';
import { UserDto } from 'src/dtos/user/user.dto';
import { AuthService } from 'src/services/auth/auth.service';
import { AppUser } from '../decorators/app-user.decorator';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { LocalAuthGuard } from '../guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@AppUser() user: UserDto) {
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@AppUser() user: UserDto) {
    return await this.authService.login(user);
  }

  @Post('sign-up')
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.signUp(registerUserDto);
  }
}
