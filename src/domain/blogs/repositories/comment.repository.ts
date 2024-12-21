import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async findByBlogId(blogId: string): Promise<Comment[]> {
    return this.find({
      where: { blogId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUserId(userId: string): Promise<Comment[]> {
    return this.find({
      where: { userId },
      relations: ['blog'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByBlogIdAndUserId(
    blogId: string,
    userId: string,
  ): Promise<Comment[]> {
    return this.find({
      where: { blogId, userId },
      order: { createdAt: 'DESC' },
    });
  }
}
