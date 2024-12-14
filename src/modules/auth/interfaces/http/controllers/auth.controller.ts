import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Version,
} from '@nestjs/common';
import { AuthService } from '@modules/auth/application/services/auth.service';
import {
  RegisterDto,
  LoginDto,
  TokensDto,
} from '@modules/auth/domain/dtos/auth.dto';
import { AccessTokenGuard } from '@modules/auth/infrastructure/guards/access-token.guard';
import { RefreshTokenGuard } from '@modules/auth/infrastructure/guards/refresh-token.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version('1')
  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<TokensDto> {
    return this.authService.register(registerDto);
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<TokensDto> {
    return this.authService.login(loginDto);
  }

  @Version('1')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user['id']);
  }

  @Version('1')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    const user = req.user;
    return this.authService.refreshTokens(user['id'], user['refreshToken']);
  }
}
