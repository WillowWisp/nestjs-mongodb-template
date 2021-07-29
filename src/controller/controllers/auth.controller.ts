import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginResponseDto } from 'src/common/dtos/user/login-response.dto';
import { LoginUserDto } from 'src/common/dtos/user/login-user.dto';
import { RegisterUserDto } from 'src/common/dtos/user/register-user.dto';
import { ShortUserDto, UserDto } from 'src/common/dtos/user/user.dto';
import { AuthService } from 'src/services/auth/auth.service';
import { AppUser } from '../decorators/app-user.decorator';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { LocalAuthGuard } from '../guards/local.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  async getProfile(@AppUser() user: ShortUserDto): Promise<UserDto> {
    return await this.authService.getUserByUsername(user.username);
  }

  @Post('sign-up')
  @ApiOkResponse({ type: UserDto })
  async signUp(@Body() registerUserDto: RegisterUserDto): Promise<UserDto> {
    return await this.authService.signUp(registerUserDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ type: LoginResponseDto })
  async login(
    @Body() _body: LoginUserDto, // For LocalStrategy
    @AppUser() user: ShortUserDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.login(user);
  }
}
