import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';

export interface ImageMetadata {
  url: string;
  publicId: string;
  caption?: string;
  altText?: string;
  width: number;
  height: number;
}

@Entity('blogs')
export class Blog {
  @ApiProperty({
    description: 'The unique identifier of the blog post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The multilingual title of the blog post',
    example: { en: 'My Blog Post', my: 'ကျွန်တော့်ဘလော့ဂ်' },
  })
  @Column('jsonb')
  title: Record<string, string>;

  @ApiProperty({
    description:
      'The multilingual content of the blog post with optional images',
    example: {
      en: 'Blog content in English',
      my: 'မြန်မာလို ဘလော့ဂ်အကြောင်းအရာ',
      images: [
        {
          url: 'https://example.com/image.jpg',
          publicId: 'blogs/image',
          caption: 'Image caption',
          altText: 'Alt text',
          width: 800,
          height: 600,
        },
      ],
    },
  })
  @Column('jsonb')
  content: {
    en: string;
    my: string;
    images?: ImageMetadata[];
  };

  @ApiProperty({
    description: 'The multilingual excerpt of the blog post',
    example: { en: 'Blog excerpt', my: 'ဘလော့ဂ်အကျဉ်းချုပ်' },
  })
  @Column('jsonb')
  excerpt: Record<string, string>;

  @ApiProperty({
    description: 'The URL-friendly slug of the blog post',
    example: 'my-blog-post',
  })
  @Column({ unique: true })
  slug: string;

  @ApiProperty({
    description: 'The tags associated with the blog post',
    example: 'nestjs,typescript,backend,programming',
  })
  @Column('simple-array')
  tags: string;

  @ApiProperty({
    description: 'The URL of the featured image',
    example: 'https://example.com/featured-image.jpg',
    required: false,
    nullable: true,
  })
  @Column({ nullable: true })
  featuredImage: string;

  @ApiProperty({
    description: 'The Cloudinary public ID of the featured image',
    example: 'blogs/featured-image',
    required: false,
    nullable: true,
  })
  @Column({ nullable: true })
  featuredImagePublicId: string;

  @ApiProperty({
    description: 'Whether the blog post is published',
    example: true,
  })
  @Column({ default: false })
  isPublished: boolean;

  @ApiProperty({
    description: 'The date when the blog post was published',
    example: '2023-12-21T09:00:00Z',
    required: false,
    nullable: true,
  })
  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @ApiProperty({
    description: 'The SEO metadata for the blog post',
    example: {
      title: { en: 'SEO Title', my: 'SEO ခေါင်းစဉ်' },
      description: { en: 'SEO Description', my: 'SEO ဖော်ပြချက်' },
      keywords: ['nestjs', 'typescript', 'backend'],
    },
  })
  @Column('jsonb')
  seoMetadata: {
    title: Record<string, string>;
    description: Record<string, string>;
    keywords: string[];
  };

  @ApiProperty({
    description: 'The comments on the blog post',
    type: () => [Comment],
  })
  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];

  @ApiProperty({
    description: 'The date when the blog post was created',
    example: '2023-12-21T09:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the blog post was last updated',
    example: '2023-12-21T09:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
