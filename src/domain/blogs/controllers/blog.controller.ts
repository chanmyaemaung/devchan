import { Roles } from '@core/decorators/roles.decorator';
import { PaginatedResponse, PaginationDto } from '@core/dtos/pagination.dto';
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

  // Public Routes
  @Get()
  @ApiOperation({ summary: 'Get all published blog posts (Public)' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated published blog posts.',
    type: Blog,
  })
  findAll(
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResponse<Blog>> {
    return this.blogService.findAllPublished(pagination);
  }

  @Get('tags')
  @ApiOperation({ summary: 'Get all unique tags from blog posts (Public)' })
  @ApiResponse({
    status: 200,
    description: 'Returns all unique tags.',
    type: [String],
  })
  findAllTags() {
    return this.blogService.findAllTags();
  }

  @Get(':identifier')
  @ApiOperation({ summary: 'Get a blog post by ID or slug (Public)' })
  @ApiParam({
    name: 'identifier',
    description: 'The UUID or slug of the blog post',
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
  findOne(@Param('identifier') identifier: string) {
    return this.blogService.findByIdentifier(identifier);
  }

  // Admin Routes
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new blog post (Admin only)' })
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

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a blog post (Admin only)' })
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
  @ApiOperation({ summary: 'Delete a blog post (Admin only)' })
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
