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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { Blog } from '../entities/blog.entity';
import { BlogService } from '../services/blog.service';

@ApiTags('blogs')
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({
    status: 201,
    description: 'Blog post created successfully.',
    type: Blog,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role.' })
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog posts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all blog posts.',
    type: [Blog],
  })
  findAll() {
    return this.blogService.findAll();
  }

  @Get('published')
  @ApiOperation({ summary: 'Get all published blog posts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all published blog posts.',
    type: [Blog],
  })
  findPublished() {
    return this.blogService.findAllPublished();
  }

  @Get('tags')
  @ApiOperation({ summary: 'Get all unique tags from blog posts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all unique tags.',
    type: [String],
  })
  findAllTags() {
    return this.blogService.findAllTags();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog post by ID' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the blog post',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the blog post.',
    type: Blog,
  })
  @ApiResponse({
    status: 404,
    description: 'Blog post not found.',
  })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a blog post by slug' })
  @ApiParam({
    name: 'slug',
    description: 'The slug of the blog post',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the blog post.',
    type: Blog,
  })
  @ApiResponse({
    status: 404,
    description: 'Blog post not found.',
  })
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a blog post' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the blog post to update',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Blog post updated successfully.',
    type: Blog,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role.' })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a blog post' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the blog post to delete',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Blog post deleted successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role.' })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
