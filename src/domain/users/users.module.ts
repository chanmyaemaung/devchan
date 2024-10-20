import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/domain/users/entities/user.entity';
import { UserSubscriber } from '@/domain/users/subscribers';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber],
})
export class UsersModule {}
