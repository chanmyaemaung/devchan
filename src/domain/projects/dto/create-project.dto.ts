import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { ProjectType } from '@/domain/projects/enums';

export class CreateProjectDto {
  @IsString()
  @Length(8, 255)
  readonly title: string;

  @IsString()
  readonly description?: string;

  @IsString()
  readonly image?: string;

  @IsUrl()
  readonly url?: string;

  @IsEnum(ProjectType)
  @IsOptional()
  projectType: ProjectType;

  @IsNumber()
  userId: number;
}
