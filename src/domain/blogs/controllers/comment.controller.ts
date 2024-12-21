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
import { Request as ExpressRequest } from 'express';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { CommentService } from '../services/comment.service';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    id: string;
  };
}

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Request() req: AuthenticatedRequest,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(req.user.id, createCommentDto);
  }

  @Get('blog/:blogId')
  findByBlogId(@Param('blogId') blogId: string) {
    return this.commentService.findByBlogId(blogId);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.commentService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(req.user.id, id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.commentService.remove(req.user.id, id);
  }
}
