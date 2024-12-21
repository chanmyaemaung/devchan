import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ImageMetadata } from '../entities/blog.entity';

export class MultilingualContent {
  @ApiProperty({
    description: 'The English content',
    example: 'Content in English',
  })
  @IsString()
  @IsNotEmpty()
  en: string;

  @ApiProperty({
    description: 'The Burmese content',
    example: 'မြန်မာလို အကြောင်းအရာ',
  })
  @IsString()
  @IsNotEmpty()
  my: string;
}

export class BlogImage implements ImageMetadata {
  @ApiProperty({
    description: 'The URL of the image',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'The Cloudinary public ID of the image',
    example: 'blogs/image',
  })
  @IsString()
  @IsNotEmpty()
  publicId: string;

  @ApiProperty({
    description: 'The caption for the image',
    example: 'A beautiful sunset',
    required: false,
  })
  @IsString()
  @IsOptional()
  caption?: string;

  @ApiProperty({
    description: 'The alt text for the image',
    example: 'Sunset over mountains',
    required: false,
  })
  @IsString()
  @IsOptional()
  altText?: string;

  @ApiProperty({
    description: 'The width of the image in pixels',
    example: 800,
  })
  @IsNumber()
  width: number;

  @ApiProperty({
    description: 'The height of the image in pixels',
    example: 600,
  })
  @IsNumber()
  height: number;
}

export class BlogContent extends MultilingualContent {
  @ApiProperty({
    description: 'Array of images included in the blog content',
    type: [BlogImage],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlogImage)
  images?: ImageMetadata[];
}

export class SeoMetadata {
  @ApiProperty({
    description: 'The SEO title in multiple languages',
    type: MultilingualContent,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => MultilingualContent)
  title: MultilingualContent;

  @ApiProperty({
    description: 'The SEO description in multiple languages',
    type: MultilingualContent,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => MultilingualContent)
  description: MultilingualContent;

  @ApiProperty({
    description: 'Keywords for SEO',
    example: ['nestjs', 'typescript', 'backend'],
  })
  @IsArray()
  @IsString({ each: true })
  keywords: string[];
}

export class CreateBlogDto {
  @ApiProperty({
    description: 'The title of the blog post in multiple languages',
    type: MultilingualContent,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => MultilingualContent)
  title: MultilingualContent;

  @ApiProperty({
    description:
      'The content of the blog post in multiple languages with optional images',
    type: BlogContent,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => BlogContent)
  content: BlogContent;

  @ApiProperty({
    description: 'The excerpt of the blog post in multiple languages',
    type: MultilingualContent,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => MultilingualContent)
  excerpt: MultilingualContent;

  @ApiProperty({
    description: 'The URL-friendly slug for the blog post',
    example: 'my-first-blog-post',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    description: 'Comma-separated list of tags',
    example: 'nestjs,typescript,backend,programming',
  })
  @IsString()
  @IsNotEmpty()
  tags: string;

  @ApiProperty({
    description: 'The URL of the featured image',
    example: 'https://example.com/featured-image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  featuredImage?: string;

  @ApiProperty({
    description: 'The Cloudinary public ID of the featured image',
    example: 'blogs/featured-image',
    required: false,
  })
  @IsString()
  @IsOptional()
  featuredImagePublicId?: string;

  @ApiProperty({
    description: 'Whether to publish the blog post immediately',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({
    description: 'SEO metadata for the blog post',
    type: SeoMetadata,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => SeoMetadata)
  seoMetadata: SeoMetadata;
}
