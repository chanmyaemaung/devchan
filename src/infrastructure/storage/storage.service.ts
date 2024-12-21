import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

export interface UploadResponse {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  resourceType: string;
}

type ResourceType = 'raw' | 'auto' | 'image' | 'video';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  constructor(private readonly configService: ConfigService) {
    // Initialize Cloudinary with credentials
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  /**
   * Upload a file to Cloudinary
   * @param file The file buffer to upload
   * @param options Upload options
   * @returns Promise<UploadResponse>
   */
  async uploadFile(
    file: Buffer,
    options: {
      folder?: string;
      public_id?: string;
      resource_type?: ResourceType;
      tags?: string[];
      transformation?: any[];
    } = {},
  ): Promise<UploadResponse> {
    try {
      const uploadOptions = {
        folder: options.folder || this.configService.get('CLOUDINARY_FOLDER'),
        public_id: options.public_id,
        resource_type: options.resource_type || 'auto',
        tags: options.tags,
        transformation: options.transformation,
      };

      // Create a readable stream from the buffer
      const stream = new Readable();
      stream.push(file);
      stream.push(null);

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) {
              this.logger.error(
                `Failed to upload file to Cloudinary: ${error.message}`,
              );
              reject(error);
              return;
            }

            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              resourceType: result.resource_type,
            });
          },
        );

        stream.pipe(uploadStream);
      });
    } catch (error) {
      this.logger.error(`Error uploading file: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete a file from Cloudinary
   * @param publicId The public ID of the file to delete
   * @returns Promise<boolean>
   */
  async deleteFile(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error) {
      this.logger.error(
        `Failed to delete file from Cloudinary: ${error.message}`,
      );
      throw error;
    }
  }

  /**
   * Generate a Cloudinary URL with transformations
   * @param publicId The public ID of the image
   * @param options Transformation options
   * @returns string
   */
  generateUrl(
    publicId: string,
    options: {
      width?: number;
      height?: number;
      crop?: string;
      format?: string;
      quality?: number;
    } = {},
  ): string {
    return cloudinary.url(publicId, {
      secure: true,
      width: options.width,
      height: options.height,
      crop: options.crop,
      format: options.format,
      quality: options.quality,
    });
  }
}
