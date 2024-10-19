import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@/database/config/database.config';
import { SeedingModule } from '@/database/seeding/seeding.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    SeedingModule,
  ],
})
export class DatabaseModule {}
