import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiResponse } from '../common/responses/api-response';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const post = await this.postsService.create(createPostDto);
    return ApiResponse.success(post, 'Post created successfully');
  }

  @Post('bulk')
  async bulkCreate(@Body() createPostsDto: CreatePostDto[]) {
    const posts = await this.postsService.bulkCreate(createPostsDto);
    return ApiResponse.success(posts, 'Posts created successfully');
  }

  @Get()
  async findAll() {
    const posts = await this.postsService.findAll();
    return ApiResponse.success(posts, 'Posts retrieved successfully');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    return ApiResponse.success(post, 'Post retrieved successfully');
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const updatedPost = await this.postsService.update(id, updatePostDto);
    return ApiResponse.success(updatedPost, 'Post updated successfully');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postsService.remove(id);
    return ApiResponse.success(null, 'Post deleted successfully');
  }
}