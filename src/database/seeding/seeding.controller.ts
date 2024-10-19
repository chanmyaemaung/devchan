import { Controller, Post } from '@nestjs/common';
import { SeedingService } from './seeding.service';

@Controller('seeding')
export class SeedingController {
  constructor(
    /**
     * Injecting Seeding Service
     */
    private readonly seedingService: SeedingService,
  ) {}

  @Post()
  seed() {
    return this.seedingService.seed();
  }
}
