import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { Blog } from '../entities/blog.entity';
import { BlogRepository } from '../repositories/blog.repository';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const blog = this.blogRepository.create(createBlogDto);
      if (createBlogDto.isPublished) {
        blog.publishedAt = new Date();
      }
      return await transactionalEntityManager.save(Blog, blog);
    });
  }

  async findAll(): Promise<Blog[]> {
    return this.blogRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findPublished(): Promise<Blog[]> {
    return this.blogRepository.findPublished();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with ID "${id}" not found`);
    }
    return blog;
  }

  async findBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogRepository.findBySlug(slug);
    if (!blog) {
      throw new NotFoundException(`Blog with slug "${slug}" not found`);
    }
    return blog;
  }

  async findByTags(tags: string[]): Promise<Blog[]> {
    return this.blogRepository.findByTags(tags);
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const blog = await this.findOne(id);

      // Handle publishing status
      if (updateBlogDto.isPublished && !blog.isPublished) {
        blog.publishedAt = new Date();
      }

      Object.assign(blog, updateBlogDto);
      return await transactionalEntityManager.save(Blog, blog);
    });
  }

  async remove(id: string): Promise<void> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const blog = await this.findOne(id);
      await transactionalEntityManager.remove(Blog, blog);
    });
  }
}
