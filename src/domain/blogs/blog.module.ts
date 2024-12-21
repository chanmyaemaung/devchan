import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './controllers/blog.controller';
import { CommentController } from './controllers/comment.controller';
import { Blog } from './entities/blog.entity';
import { Comment } from './entities/comment.entity';
import { BlogRepository } from './repositories/blog.repository';
import { CommentRepository } from './repositories/comment.repository';
import { BlogService } from './services/blog.service';
import { CommentService } from './services/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Comment])],
  controllers: [BlogController, CommentController],
  providers: [BlogService, BlogRepository, CommentService, CommentRepository],
  exports: [BlogService, CommentService],
})
export class BlogModule {}
