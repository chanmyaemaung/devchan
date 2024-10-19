import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from '@/database/database.module';
import { EnvModule } from '@/env/env.module';
import { UsersModule } from '@/domain/users.module';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [DatabaseModule, EnvModule, UsersModule, CommonModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
