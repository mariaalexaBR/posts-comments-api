import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, minlength: 3 })
  title: string;

  @Prop({ required: true, minlength: 10 })
  body: string;

  @Prop({ required: true })
  author: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);