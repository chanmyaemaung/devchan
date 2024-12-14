import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
  Version,
} from '@nestjs/common';
import { NavigationService } from '@modules/navigation/application/services/navigation.service';
import {
  CreateNavigationMenuDto,
  UpdateNavigationMenuDto,
} from '@modules/navigation/domain/dtos/navigation.dto';
import { AccessTokenGuard } from '@modules/auth/infrastructure/guards/access-token.guard';
import { RolesGuard } from '@modules/auth/infrastructure/guards/roles.guard';
import { Roles } from '@modules/auth/infrastructure/decorators/roles.decorator';
import { UserRole } from '@modules/users/domain/entities/user.entity';
import { NavigationType } from '@modules/navigation/domain/entities/navigation.entity';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Version('1')
  @Post()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createDto: CreateNavigationMenuDto) {
    return this.navigationService.create(createDto);
  }

  @Version('1')
  @Get()
  findAll() {
    return this.navigationService.findAll();
  }

  @Version('1')
  @Get('type')
  findByType(@Query('type') type: NavigationType) {
    return this.navigationService.findByType(type);
  }

  @Version('1')
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.navigationService.findById(id);
  }

  @Version('1')
  @Put(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateDto: UpdateNavigationMenuDto) {
    return this.navigationService.update(id, updateDto);
  }

  @Version('1')
  @Delete(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  delete(@Param('id') id: string) {
    return this.navigationService.delete(id);
  }
}
