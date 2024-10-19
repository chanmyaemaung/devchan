import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from '@/database/database.module';
import { EnvModule } from '@/env/env.module';

@Module({
  imports: [DatabaseModule, EnvModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
