import { IsBoolean } from '@/common/decorators';
import { IsOptional } from 'class-validator';

export class RemoveDto {
  @IsOptional()
  @IsBoolean()
  readonly soft: boolean;
}
