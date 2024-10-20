import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from '@/database/database.module';
import { EnvModule } from '@/env/env.module';
import { UsersModule } from '@/domain/users/users.module';
import { CommonModule } from '@/common/common.module';
import { ProjectsModule } from '@/domain/projects/projects.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    EnvModule,
    UsersModule,
    CommonModule,
    ProjectsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
