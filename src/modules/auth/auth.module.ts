import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './interfaces/http/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { AccessTokenStrategy } from './infrastructure/strategies/access-token.strategy';
import { RefreshTokenStrategy } from './infrastructure/strategies/refresh-token.strategy';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
