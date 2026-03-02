import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Post, PostDocument } from '../posts/schemas/post.schema';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiResponse } from '../common/responses/api-response';

@Injectable()
export class CommentsService {

  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) { }

  async create(createCommentDto: CreateCommentDto) {

    const post = await this.postModel.findById(createCommentDto.postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = new this.commentModel({
      ...createCommentDto,
      postId: new Types.ObjectId(createCommentDto.postId),
    });

    return await comment.save();
  }

  async findByPost(postId: string, paginationDto: PaginationDto) {
    
    if (!postId) {
      throw new NotFoundException('postId query param is required');
    }

    const { page = 1, limit = 10 } = paginationDto;

    const post = await this.postModel.findById(postId).exec();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.commentModel
        .find({ postId: new Types.ObjectId(postId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.commentModel.countDocuments({
        postId: new Types.ObjectId(postId),
      }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async remove(id: string) {
    const result = await this.commentModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException('Comment not found');
    }

    return result;
  }
}