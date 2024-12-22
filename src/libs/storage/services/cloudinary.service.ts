import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { StorageOptions, UploadResponse } from './storage.service';

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {}

  async uploadFile(
    file: Express.Multer.File,
    options?: StorageOptions,
  ): Promise<UploadResponse> {
    const uploadOptions = {
      folder: options?.folder || 'uploads',
      allowed_formats: options?.allowedFormats || ['jpg', 'jpeg', 'png', 'gif'],
      transformation: options?.transformation || [],
    };

    try {
      const result = await this.uploadBuffer(file.buffer, uploadOptions);
      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  private async uploadBuffer(
    buffer: Buffer,
    options: any,
  ): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      uploadStream.end(buffer);
    });
  }

  async deleteFile(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  async generateUploadSignature(
    options?: StorageOptions,
  ): Promise<{ signature: string; timestamp: number }> {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = options?.folder || 'uploads';

    const params = {
      timestamp,
      folder,
      ...options,
    };

    const signature = cloudinary.utils.api_sign_request(
      params,
      this.configService.get('CLOUDINARY_API_SECRET'),
    );

    return { signature, timestamp };
  }
}
