import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts') // Use ApiTags to group the controller in Swagger documentation
export class PostsController {
  constructor(
    // Inject any required services here, e.g., PostsService
    private readonly postsService: PostsService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'List of posts for the user',
  })
  @Get('/:userId')
  public getPosts(
    @Param('userId') userId: string, // Use Param decorator to get userId from the route
  ) {
    return this.postsService.findAll(userId);
  }

  @ApiResponse({
    status: 201,
    description: 'Post created successfully',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @ApiOperation({
    summary: 'Update an existing post',
    description:
      'This endpoint allows you to update an existing post by providing the post ID and the fields to update.',
  })
  @ApiResponse({
    status: 201,
    description: 'Post updated successfully',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return 'This method is not implemented yet';
  }
}
