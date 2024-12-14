import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavigationMenu } from './domain/entities/navigation.entity';
import { NavigationRepository } from './infrastructure/repositories/navigation.repository';
import { NavigationService } from './application/services/navigation.service';
import { NavigationController } from './interfaces/http/controllers/navigation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NavigationMenu])],
  providers: [NavigationRepository, NavigationService],
  controllers: [NavigationController],
  exports: [NavigationService],
})
export class NavigationModule {}
