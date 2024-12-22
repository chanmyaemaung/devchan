import { PaginatedResponse, PaginationDto } from '@core/dtos/pagination.dto';
import { User } from '@domain/users/entities/user.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { Comment } from '../entities/comment.entity';
import { CommentRepository } from '../repositories/comment.repository';
import { BlogService } from './blog.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly blogService: BlogService,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      // Check if blog exists
      await this.blogService.findOne(createCommentDto.blogId);

      const comment = this.commentRepository.create({
        ...createCommentDto,
        userId: user.id,
      });

      return await transactionalEntityManager.save(Comment, comment);
    });
  }

  async findAllByBlog(
    blogId: string,
    pagination: PaginationDto,
  ): Promise<PaginatedResponse<Comment>> {
    // Check if blog exists
    await this.blogService.findOne(blogId);

    const [data, total] = await this.commentRepository.findAndCount({
      where: { blogId },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });

    const lastPage = Math.ceil(total / pagination.limit);

    return {
      data,
      meta: {
        total,
        page: pagination.page,
        lastPage,
        hasNextPage: pagination.page < lastPage,
        hasPrevPage: pagination.page > 1,
      },
    };
  }

  async findAllByUser(
    userId: string,
    pagination: PaginationDto,
  ): Promise<PaginatedResponse<Comment>> {
    const [data, total] = await this.commentRepository.findAndCount({
      where: { userId },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      order: { createdAt: 'DESC' },
      relations: ['blog'],
    });

    const lastPage = Math.ceil(total / pagination.limit);

    return {
      data,
      meta: {
        total,
        page: pagination.page,
        lastPage,
        hasNextPage: pagination.page < lastPage,
        hasPrevPage: pagination.page > 1,
      },
    };
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
    id: string,
    updateCommentDto: UpdateCommentDto,
    user: User,
  ): Promise<Comment> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const comment = await this.findOne(id);

      if (comment.userId !== user.id) {
        throw new ForbiddenException('You can only update your own comments');
      }

      Object.assign(comment, updateCommentDto);
      comment.isEdited = true;

      return await transactionalEntityManager.save(Comment, comment);
    });
  }

  async remove(id: string, user: User): Promise<void> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const comment = await this.findOne(id);

      if (comment.userId !== user.id) {
        throw new ForbiddenException('You can only delete your own comments');
      }

      await transactionalEntityManager.remove(Comment, comment);
    });
  }
}
