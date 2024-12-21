import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class MultilingualContent {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  my: string;
}

class MultilingualRichContent {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  my: string;

  @IsArray()
  @IsOptional()
  images?: {
    url: string;
    caption?: string;
    altText?: string;
  }[];
}

class SeoMetadata {
  @ValidateNested()
  @Type(() => MultilingualContent)
  title: MultilingualContent;

  @ValidateNested()
  @Type(() => MultilingualContent)
  description: MultilingualContent;

  @IsArray()
  @IsString({ each: true })
  keywords: string[];
}

export class CreateBlogDto {
  @ValidateNested()
  @Type(() => MultilingualContent)
  title: MultilingualContent;

  @ValidateNested()
  @Type(() => MultilingualRichContent)
  content: MultilingualRichContent;

  @ValidateNested()
  @Type(() => MultilingualContent)
  excerpt: MultilingualContent;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  tags: string;

  @IsString()
  @IsOptional()
  featuredImage?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ValidateNested()
  @Type(() => SeoMetadata)
  seoMetadata: SeoMetadata;
}
