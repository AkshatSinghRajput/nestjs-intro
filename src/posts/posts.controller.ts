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
   *
   * @param {string} userId - The unique identifier of the user
   * @returns {object[]} Array of post objects for the specified user
   * @memberof PostsController
   * @example
   * GET /posts/123
   * // Returns: [{ user: {...}, content: "...", createdAt: "...", id: 456 }]
   */
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

  /**
   * Creates a new post in the system.
   *
   * This endpoint accepts post data through the request body and creates
   * a new post with proper validation, content processing, and metadata
   * management including slug generation and content categorization.
   *
   * @param {CreatePostDto} createPostDto - Post data for creating new content
   * @returns {object} The created post object with generated metadata
   * @memberof PostsController
   * @example
   * POST /posts
   * Body: {
   *   "title": "Understanding NestJS",
   *   "content": "NestJS is a powerful framework...",
   *   "postType": "POST"
   * }
   * // Returns: { id: 789, title: "Understanding NestJS", ... }
   */
  @ApiResponse({
    status: 201,
    description: 'Post created successfully',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  /**
   * Updates an existing post with new information.
   *
   * This endpoint allows partial updates to post content and metadata
   * using the PATCH method. It supports updating various post attributes
   * while maintaining data integrity and content validation.
   *
   * @param {PatchPostDto} patchPostDto - Partial post data for updates
   * @returns {string} Update status message
   * @memberof PostsController
   * @example
   * PATCH /posts
   * Body: {
   *   "title": "Updated Post Title",
   *   "content": "Updated content..."
   * }
   * // Returns: "This method is not implemented yet"
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

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
