import { IsCardinal } from '@/common/decorators';

export class IdDto {
  @IsCardinal()
  id: number;
}
