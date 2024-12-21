import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  title: {
    en: string;
    my: string;
  };

  @Column('jsonb')
  content: {
    en: string;
    my: string;
    images?: {
      url: string;
      caption?: string;
      altText?: string;
    }[];
  };

  @Column('jsonb')
  excerpt: {
    en: string;
    my: string;
  };

  @Column('varchar', { length: 255 })
  slug: string;

  @Column('simple-array')
  tags: string;

  @Column('varchar', { length: 255, nullable: true })
  featuredImage: string;

  @Column('boolean', { default: false })
  isPublished: boolean;

  @Column('timestamp', { nullable: true })
  publishedAt: Date;

  @Column('jsonb')
  seoMetadata: {
    title: {
      en: string;
      my: string;
    };
    description: {
      en: string;
      my: string;
    };
    keywords: string[];
  };

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
