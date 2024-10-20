import { IsCardinal } from '@/common/decorators';

export class IdDto {
  @IsCardinal()
  readonly id: number;
}
