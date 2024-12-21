import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { Comment } from '../entities/comment.entity';
import { BlogRepository } from '../repositories/blog.repository';
import { CommentRepository } from '../repositories/comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly blogRepository: BlogRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    userId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const blog = await this.blogRepository.findOne({
        where: { id: createCommentDto.blogId },
      });

      if (!blog) {
        throw new NotFoundException(
          `Blog with ID "${createCommentDto.blogId}" not found`,
        );
      }

      const comment = this.commentRepository.create({
        ...createCommentDto,
        userId,
      });

      return await transactionalEntityManager.save(Comment, comment);
    });
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
      relations: ['user', 'blog'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByBlogId(blogId: string): Promise<Comment[]> {
    return this.commentRepository.findByBlogId(blogId);
  }

  async findByUserId(userId: string): Promise<Comment[]> {
    return this.commentRepository.findByUserId(userId);
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'blog'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }

    return comment;
  }

  async update(
    userId: string,
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const comment = await this.findOne(id);

      if (comment.userId !== userId) {
        throw new ForbiddenException(
          'You are not authorized to update this comment',
        );
      }

      Object.assign(comment, updateCommentDto);
      comment.isEdited = true;

      return await transactionalEntityManager.save(Comment, comment);
    });
  }

  async remove(userId: string, id: string): Promise<void> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const comment = await this.findOne(id);

      if (comment.userId !== userId) {
        throw new ForbiddenException(
          'You are not authorized to delete this comment',
        );
      }

      await transactionalEntityManager.remove(Comment, comment);
    });
  }
}
