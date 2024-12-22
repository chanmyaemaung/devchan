import { GetUser } from '@core/decorators/get-user.decorator';
import { PaginatedResponse, PaginationDto } from '@core/dtos/pagination.dto';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { User } from '@domain/users/entities/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
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
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { Comment } from '../entities/comment.entity';
import { CommentService } from '../services/comment.service';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('blog/:blogId')
  @ApiOperation({ summary: 'Get all comments for a blog post' })
  @ApiParam({
    name: 'blogId',
    description: 'The UUID of the blog post',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated comments for the blog post.',
    type: Comment,
  })
  findAllByBlog(
    @Param('blogId', ParseUUIDPipe) blogId: string,
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResponse<Comment>> {
    return this.commentService.findAllByBlog(blogId, pagination);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all comments by a user' })
  @ApiParam({
    name: 'userId',
    description: 'The UUID of the user',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated comments by the user.',
    type: Comment,
  })
  findAllByUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResponse<Comment>> {
    return this.commentService.findAllByUser(userId, pagination);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({
    status: 201,
    description: 'Comment created successfully.',
    type: Comment,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentService.create(createCommentDto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the comment to update',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Comment updated successfully.',
    type: Comment,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not comment owner.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentService.update(id, updateCommentDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the comment to delete',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Comment deleted successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not comment owner.' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.commentService.remove(id, user);
  }
}
