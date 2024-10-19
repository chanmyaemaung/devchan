import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '@/domain/projects/entities/project.entity';
import { UsersModule } from '@/domain/users/users.module';
import { User } from '@/domain/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User]), UsersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
