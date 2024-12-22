import { Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

export interface UploadResponse {
  url: string;
  publicId: string;
}

export interface StorageOptions {
  folder?: string;
  transformation?: any;
  allowedFormats?: string[];
  maxFileSize?: number;
}

@Injectable()
export class StorageService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadFile(
    file: Express.Multer.File,
    options?: StorageOptions,
  ): Promise<UploadResponse> {
    return this.cloudinaryService.uploadFile(file, options);
  }

  async deleteFile(publicId: string): Promise<void> {
    return this.cloudinaryService.deleteFile(publicId);
  }

  async generateUploadSignature(
    options?: StorageOptions,
  ): Promise<{ signature: string; timestamp: number }> {
    return this.cloudinaryService.generateUploadSignature(options);
  }
}
