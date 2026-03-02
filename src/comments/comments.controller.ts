import { Controller, Post, Body, Get, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {

  constructor(private readonly commentsService: CommentsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  @Get()
  async findByPost(
    @Query('postId') postId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.commentsService.findByPost(postId, pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.commentsService.remove(id);
  }
}