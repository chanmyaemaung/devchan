import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './controllers/blog.controller';
import { Blog } from './entities/blog.entity';
import { BlogRepository } from './repositories/blog.repository';
import { BlogService } from './services/blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
  exports: [BlogService],
})
export class BlogModule {}
