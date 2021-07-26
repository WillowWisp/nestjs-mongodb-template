import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { LocalAuthGuard } from '../auth/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req: any) {
    return req.user;
  }
}
