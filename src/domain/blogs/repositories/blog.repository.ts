import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';

@Injectable()
export class BlogRepository extends Repository<Blog> {
  constructor(private dataSource: DataSource) {
    super(Blog, dataSource.createEntityManager());
  }
}
