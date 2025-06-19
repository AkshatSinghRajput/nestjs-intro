import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class CreateManyPostsDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  posts: CreatePostDto[];
}
