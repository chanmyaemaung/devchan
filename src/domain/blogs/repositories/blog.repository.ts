import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';

@Injectable()
export class BlogRepository extends Repository<Blog> {
  constructor(private dataSource: DataSource) {
    super(Blog, dataSource.createEntityManager());
  }

  async findBySlug(slug: string): Promise<Blog | null> {
    return this.findOne({ where: { slug } });
  }

  async findPublished(): Promise<Blog[]> {
    return this.find({
      where: { isPublished: true },
      order: { publishedAt: 'DESC' },
    });
  }

  async findByTags(tags: string[]): Promise<Blog[]> {
    // Convert array to PostgreSQL array format
    const tagString = `{${tags.join(',')}}`;

    return this.createQueryBuilder('blog')
      .where('blog.tags @> :tagString', { tagString })
      .orderBy('blog.publishedAt', 'DESC')
      .getMany();
  }
}
