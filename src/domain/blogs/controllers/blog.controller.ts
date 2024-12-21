import { Roles } from '@core/decorators/roles.decorator';
import { Role } from '@core/enums/role.enum';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { BlogService } from '../services/blog.service';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get('published')
  findPublished() {
    return this.blogService.findPublished();
  }

  @Get('tags')
  findByTags(@Query('tags') tags: string) {
    // Convert comma-separated string to array and remove any quotes
    const tagArray = tags
      .split(',')
      .map((tag) => tag.trim().replace(/^["'](.+(?=["']$))["']$/, '$1'));
    return this.blogService.findByTags(tagArray);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
