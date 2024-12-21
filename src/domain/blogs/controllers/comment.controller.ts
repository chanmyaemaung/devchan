import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { Comment } from '../entities/comment.entity';
import { CommentService } from '../services/comment.service';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    id: string;
  };
}

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

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
    @Request() req: AuthenticatedRequest,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(req.user.id, createCommentDto);
  }

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
    description: 'Returns all comments for the specified blog post.',
    type: [Comment],
  })
  findByBlogId(@Param('blogId') blogId: string) {
    return this.commentService.findByBlogId(blogId);
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
    description: 'Returns all comments by the specified user.',
    type: [Comment],
  })
  findByUserId(@Param('userId') userId: string) {
    return this.commentService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the comment',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the comment.',
    type: Comment,
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found.',
  })
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
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
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Not the comment owner.',
  })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  update(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(req.user.id, id, updateCommentDto);
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
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Not the comment owner.',
  })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  remove(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.commentService.remove(req.user.id, id);
  }
}
