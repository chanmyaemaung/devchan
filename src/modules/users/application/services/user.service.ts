import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { UserRepository } from '@modules/users/infrastructure/repositories/user.repository';
import {
  UpdateProfileDto,
  ChangePasswordDto,
  UpdatePreferencesDto,
} from '@modules/users/domain/dtos/user.dto';
import { CloudinaryService } from '@modules/shared/infrastructure/services/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly configService: ConfigService,
  ) {}

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.update(userId, updateProfileDto);
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await argon2.verify(
      user.password,
      changePasswordDto.currentPassword,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedPassword = await argon2.hash(changePasswordDto.newPassword);
    return this.userRepository.update(userId, { password: hashedPassword });
  }

  async updatePreferences(
    userId: string,
    updatePreferencesDto: UpdatePreferencesDto,
  ) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.update(userId, updatePreferencesDto);
  }

  async uploadProfileImage(userId: string, file: Express.Multer.File) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const result = await this.cloudinaryService.uploadImage(file, 'profiles');
    return this.userRepository.update(userId, {
      profileImageUrl: result.secure_url,
    });
  }

  async updateLoginInfo(userId: string, ip: string, userAgent: string) {
    return this.userRepository.update(userId, {
      lastLoginIp: ip,
      userAgent: userAgent,
      lastLoginAt: new Date(),
    });
  }
}
