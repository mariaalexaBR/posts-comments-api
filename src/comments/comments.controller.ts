import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {

  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  @Get('post/:postId')
  async findByPost(@Param('postId') postId: string) {
    return await this.commentsService.findByPost(postId);
  }

  @Delete(':id')
    async remove(@Param('id') id: string) {
      return await this.commentsService.remove(id);
    }
}