import { PaginatedResponse, PaginationDto } from '@core/dtos/pagination.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateBlogDto, MultilingualContent } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { Blog } from '../entities/blog.entity';
import { BlogRepository } from '../repositories/blog.repository';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogRepository)
    private readonly blogRepository: BlogRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      // Convert DTO to entity format
      const blogData = {
        ...createBlogDto,
        title: this.convertMultilingualToRecord(createBlogDto.title),
        excerpt: this.convertMultilingualToRecord(createBlogDto.excerpt),
        content: {
          en: createBlogDto.content.en,
          my: createBlogDto.content.my,
          images: createBlogDto.content.images,
        },
        seoMetadata: {
          title: this.convertMultilingualToRecord(
            createBlogDto.seoMetadata.title,
          ),
          description: this.convertMultilingualToRecord(
            createBlogDto.seoMetadata.description,
          ),
          keywords: createBlogDto.seoMetadata.keywords,
        },
      };

      const blog = this.blogRepository.create(
        blogData as unknown as Partial<Blog>,
      );
      if (createBlogDto.isPublished) {
        blog.publishedAt = new Date();
      }

      return await transactionalEntityManager.save(Blog, blog);
    });
  }

  private convertMultilingualToRecord(
    content: MultilingualContent,
  ): Record<string, string> {
    return {
      en: content.en,
      my: content.my,
    };
  }

  async findAll(pagination: PaginationDto): Promise<PaginatedResponse<Blog>> {
    const [data, total] = await this.blogRepository.findAndCount({
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      order: { createdAt: 'DESC' },
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

  async findAllPublished(
    pagination: PaginationDto,
  ): Promise<PaginatedResponse<Blog>> {
    const [data, total] = await this.blogRepository.findAndCount({
      where: { isPublished: true },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      order: { publishedAt: 'DESC' },
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

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with ID "${id}" not found`);
    }
    return blog;
  }

  async findBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { slug } });
    if (!blog) {
      throw new NotFoundException(`Blog with slug "${slug}" not found`);
    }
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const blog = await this.findOne(id);
      const typedDto = updateBlogDto as CreateBlogDto;

      // Convert DTO to entity format
      const updateData: Partial<Blog> = {};

      if (typedDto.title) {
        updateData.title = this.convertMultilingualToRecord(typedDto.title);
      }

      if (typedDto.excerpt) {
        updateData.excerpt = this.convertMultilingualToRecord(typedDto.excerpt);
      }

      if (typedDto.content) {
        updateData.content = {
          en: typedDto.content.en,
          my: typedDto.content.my,
          images: typedDto.content.images,
        };
      }

      if (typedDto.seoMetadata) {
        updateData.seoMetadata = {
          title: this.convertMultilingualToRecord(typedDto.seoMetadata.title),
          description: this.convertMultilingualToRecord(
            typedDto.seoMetadata.description,
          ),
          keywords: typedDto.seoMetadata.keywords,
        };
      }

      if (typedDto.tags !== undefined) {
        updateData.tags = typedDto.tags;
      }

      if (typedDto.featuredImage !== undefined) {
        updateData.featuredImage = typedDto.featuredImage;
      }

      if (typedDto.featuredImagePublicId !== undefined) {
        updateData.featuredImagePublicId = typedDto.featuredImagePublicId;
      }

      // Handle publishing status
      if (typedDto.isPublished && !blog.isPublished) {
        updateData.publishedAt = new Date();
      }

      Object.assign(blog, updateData);
      return await transactionalEntityManager.save(Blog, blog);
    });
  }

  async remove(id: string): Promise<void> {
    const blog = await this.findOne(id);
    await this.blogRepository.remove(blog);
  }

  async findAllTags(): Promise<string[]> {
    const blogs = await this.blogRepository.find();
    const tagsSet = new Set<string>();

    blogs.forEach((blog) => {
      const tags = blog.tags.split(',');
      tags.forEach((tag) => tagsSet.add(tag.trim()));
    });

    return Array.from(tagsSet);
  }
}
