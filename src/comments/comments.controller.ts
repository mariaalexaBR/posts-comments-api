import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiResponse } from '../common/responses/api-response';

@Controller('comments')
export class CommentsController {

  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    const comment = await this.commentsService.create(createCommentDto);
    return ApiResponse.success(comment,'Comment created successfully');
  }

  @Get('post/:postId')
  async findByPost(@Param('postId') postId: string) {
    const comments = await this.commentsService.findByPost(postId);
    return ApiResponse.success(comments, 'Comments retrieved successfully');
  }

  @Delete(':id')
    async remove(@Param('id') id: string) {
      await this.commentsService.remove(id);
      return ApiResponse.success(null, 'Comment deleted successfully');
    }
}