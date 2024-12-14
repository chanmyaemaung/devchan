import {
  IsString,
  IsEnum,
  IsOptional,
  IsUUID,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { NavigationType } from '../entities/navigation.entity';

export class CreateNavigationMenuDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  titleMM?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsInt()
  order: number;

  @IsEnum(NavigationType)
  type: NavigationType;

  @IsUUID()
  @IsOptional()
  parentId?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateNavigationMenuDto extends CreateNavigationMenuDto {
  @IsOptional()
  title: string;

  @IsOptional()
  order: number;

  @IsOptional()
  type: NavigationType;
}
