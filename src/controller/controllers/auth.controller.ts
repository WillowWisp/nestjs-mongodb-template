import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from 'src/common/dtos/user/register-user.dto';
import { ShortUserDto } from 'src/common/dtos/user/user.dto';
import { AuthService } from 'src/services/auth/auth.service';
import { AppUser } from '../decorators/app-user.decorator';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { LocalAuthGuard } from '../guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@AppUser() user: ShortUserDto) {
    return await this.authService.getUserByUsername(user.username);
  }

  @Post('sign-up')
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.signUp(registerUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@AppUser() user: ShortUserDto) {
    return await this.authService.login(user);
  }
}
