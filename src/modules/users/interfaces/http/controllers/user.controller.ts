import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  Req,
  Version,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from '@modules/auth/infrastructure/guards/access-token.guard';
import { UserService } from '@modules/users/application/services/user.service';
import {
  UpdateProfileDto,
  ChangePasswordDto,
  UpdatePreferencesDto,
} from '@modules/users/domain/dtos/user.dto';
import { Request } from 'express';

@Controller('users')
@UseGuards(AccessTokenGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Version('1')
  @Put('profile')
  updateProfile(
    @Req() req: Request,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(req.user['id'], updateProfileDto);
  }

  @Version('1')
  @Post('change-password')
  changePassword(
    @Req() req: Request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(req.user['id'], changePasswordDto);
  }

  @Version('1')
  @Put('preferences')
  updatePreferences(
    @Req() req: Request,
    @Body() updatePreferencesDto: UpdatePreferencesDto,
  ) {
    return this.userService.updatePreferences(
      req.user['id'],
      updatePreferencesDto,
    );
  }

  @Version('1')
  @Post('profile-image')
  @UseInterceptors(FileInterceptor('image'))
  uploadProfileImage(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadProfileImage(req.user['id'], file);
  }
}
