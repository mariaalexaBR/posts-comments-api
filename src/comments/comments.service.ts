import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {

  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) { }

  async create(createCommentDto: CreateCommentDto) {
    const comment = new this.commentModel({
      ...createCommentDto,
      postId: new Types.ObjectId(createCommentDto.postId),
    });

    return await comment.save();
  }

  async findByPost(postId: string) {
    const comments = await this.commentModel.find({
      postId: new Types.ObjectId(postId),
    });

    if (!comments.length) {
      throw new NotFoundException('No comments found for this post');
    }

    return comments;
  }

  async remove(id: string) {
    const result = await this.commentModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException('Comment not found');
    }

    return result;
  }
}