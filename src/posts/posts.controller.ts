import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-post.dto';
import { CreateManyPostsDto } from './dtos/create-many-posts.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/auth/interface/active-user.interface';

/**
 * Posts controller that handles HTTP requests related to post management.
 *
 * This controller provides RESTful endpoints for post operations including
 * creating, reading, and updating posts. It supports user-specific post
 * retrieval and comprehensive post management with proper validation
 * and API documentation.
 *
 * @controller PostsController
 * @description Handles post-related HTTP requests and operations
 */
@Controller('posts')
@ApiTags('Posts') // Use ApiTags to group the controller in Swagger documentation
export class PostsController {
  /**
   * Creates an instance of PostsController.
   *
   * @param {PostsService} postsService - The injected posts service
   * @memberof PostsController
   */
  constructor(
    // Inject any required services here, e.g., PostsService
    private readonly postsService: PostsService,
  ) {}

  /**
   * Retrieves all posts for a specific user.
   *
   * This endpoint returns a list of all posts associated with the specified
   * user ID. It provides user-specific content filtering and supports
   * comprehensive post data retrieval.
   */
  @ApiResponse({
    status: 200,
    description: 'List of posts for the user',
  })
  @Get('/:userId')
  public getPosts(
    @Param('userId') userId: string, // Use Param decorator to get userId from the route
    @Query() postQuery: GetPostsDto,
  ) {
    return this.postsService.findAll(postQuery, userId);
  }

  /**
   * Creates a new post in the system.
   *
   * This endpoint accepts post data through the request body and creates
   * a new post with proper validation, content processing, and metadata
   * management including slug generation and content categorization.
   */
  @ApiResponse({
    status: 201,
    description: 'Post created successfully',
  })
  @Post()
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.postsService.createPost(createPostDto, user);
  }

  @Post('/create-many')
  public createManyPosts(@Body() createManyPostsDto: CreateManyPostsDto) {
    return this.postsService.createManyPosts(createManyPostsDto);
  }

  /**
   * Updates an existing post with new information.
   *
   * This endpoint allows partial updates to post content and metadata
   * using the PATCH method. It supports updating various post attributes
   * while maintaining data integrity and content validation.
   */
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
    return this.postsService.patchPost(patchPostDto);
  }

  /**
   * Deletes a post by its ID.
   *
   * This endpoint allows the deletion of a post from the system using
   * the DELETE method. It ensures that the specified post is removed
   * securely and efficiently.
   */
  @ApiOperation({
    summary: 'Delete a post by ID',
    description:
      'This endpoint allows you to delete a post by providing its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Post deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid post ID provided',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
