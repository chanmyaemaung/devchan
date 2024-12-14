import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

export class ChangePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  newPassword: string;
}

export class UpdatePreferencesDto {
  @IsEnum(['light', 'dark'])
  @IsOptional()
  theme?: 'light' | 'dark';

  @IsString()
  @IsOptional()
  language?: string;
}
