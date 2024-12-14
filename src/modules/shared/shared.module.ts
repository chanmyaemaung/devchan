import { Module } from '@nestjs/common';
import { CloudinaryService } from './infrastructure/services/cloudinary.service';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class SharedModule {}
