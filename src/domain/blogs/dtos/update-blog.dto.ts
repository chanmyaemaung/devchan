import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  BlogContent,
  MultilingualContent,
  SeoMetadata,
} from './create-blog.dto';

export class UpdateBlogDto {
  @ApiPropertyOptional({
    description: 'The title of the blog post in multiple languages',
    example: {
      en: 'Updated Blog Title',
      my: 'ပြင်ဆင်ထားသော ဘလော့ခေါင်းစဉ်',
    },
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => MultilingualContent)
  title?: MultilingualContent;

  @ApiPropertyOptional({
    description:
      'The content of the blog post in multiple languages with optional images',
    example: {
      en: 'Updated blog content in English',
      my: 'မြန်မာလို ပြင်ဆင်ထားသော ဘလော့အကြောင်းအရာ',
      images: [
        {
          url: 'https://example.com/updated-image.jpg',
          publicId: 'blogs/updated-image',
          caption: 'Updated image caption',
          altText: 'Updated alt text',
          width: 800,
          height: 600,
        },
      ],
    },
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => BlogContent)
  content?: BlogContent;

  @ApiPropertyOptional({
    description: 'The excerpt of the blog post in multiple languages',
    example: {
      en: 'Updated blog excerpt',
      my: 'ပြင်ဆင်ထားသော ဘလော့အကျဉ်းချုပ်',
    },
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => MultilingualContent)
  excerpt?: MultilingualContent;

  @ApiPropertyOptional({
    description: 'The URL-friendly slug for the blog post',
    example: 'updated-blog-post',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  slug?: string;

  @ApiPropertyOptional({
    description: 'Comma-separated list of tags',
    example: 'updated,tags,blog',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  tags?: string;

  @ApiPropertyOptional({
    description: 'The URL of the featured image',
    example: 'https://example.com/updated-featured-image.jpg',
  })
  @IsString()
  @IsOptional()
  featuredImage?: string;

  @ApiPropertyOptional({
    description: 'The Cloudinary public ID of the featured image',
    example: 'blogs/updated-featured-image',
  })
  @IsString()
  @IsOptional()
  featuredImagePublicId?: string;

  @ApiPropertyOptional({
    description: 'Whether to publish the blog post',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional({
    description: 'SEO metadata for the blog post',
    example: {
      title: {
        en: 'Updated SEO Title',
        my: 'ပြင်ဆင်ထားသော SEO ခေါင်းစဉ်',
      },
      description: {
        en: 'Updated SEO Description',
        my: 'ပြင်ဆင်ထားသော SEO ဖော်ပြချက်',
      },
      keywords: ['updated', 'seo', 'keywords'],
    },
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => SeoMetadata)
  seoMetadata?: SeoMetadata;
}
