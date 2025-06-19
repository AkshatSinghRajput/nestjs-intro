import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../posts.entity';
import { DataSource, Repository } from 'typeorm';
import { TagsService } from 'src/tags/services/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-post.dto';
import { CreateManyPostsDto } from '../dtos/create-many-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

/**
 * Posts service that provides post-related business logic and data operations.
 *
 * This service handles all post-related operations including post creation,
 * retrieval, management, and integration with user services. It provides
 * the core business logic for post operations throughout the application,
 * including content processing and user association.
 *
 * @service PostsService
 * @description Provides post management and data operations
 */
@Injectable()
export class PostsService {
  /**
   * Creates an instance of PostsService.
   *
   * @param {UsersService} usersService - The injected users service for user operations
   * @memberof PostsService
   */
  constructor(
    // Post repository

    private readonly usersService: UsersService, // Inject UsersService if needed

    private readonly tagService: TagsService,

    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>, // Inject the Posts repository for database operations

    private readonly dataSource: DataSource, // Inject the DataSource for database operations

    private readonly paginationProvider: PaginationProvider,
  ) {}

  /**
   * Retrieves all posts for a specific user.
   *
   * This method fetches all posts associated with the specified user ID,
   * including user information and post metadata. It generates simulated
   * post data with user context and temporal information.
   *
   * @param {string} userId - The unique identifier of the user
   * @returns {object[]} Array of post objects with user and content information
   * @memberof PostsService
   * @example
   * const posts = postsService.findAll('123');
   * // Returns: [
   * //   {
   * //     user: { id: 1231, firstName: "John", ... },
   * //     content: "This is a post content for user 123",
   * //     createdAt: "2023-06-13T...",
   * //     id: 456
   * //   }
   * // ]
   */
  public async findAll(
    postQuery: GetPostsDto,
    userId: string,
  ): Promise<Paginated<Posts>> {
    let user = await this.usersService.getUserById({
      id: parseInt(userId),
    });
    if (!user) {
      throw new UnauthorizedException('User not found or unauthorized');
    }

    let posts: Paginated<Posts>;
    try {
      posts = await this.paginationProvider.paginateQuery(
        {
          limit: postQuery.limit,
          page: postQuery.page,
        },
        this.postsRepository,
      );
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }
    return posts;
  }

  /**
   * Creates a new post in the system.
   *
   * This method accepts post data through the request body and creates
   * a new post with proper validation, content processing, and metadata
   * management including slug generation and content categorization.
   *
   * @param {CreatePostDto} createPostDto - Post data for creating new content
   * @returns {object} The created post object with generated metadata
   * @memberof PostsService
   * @example
   * const newPost = await postsService.createPost({
   *   title: "Understanding NestJS",
   *   content: "NestJS is a powerful framework...",
   *   postType: "POST",
   *   authorId: 123,
   * });
   * // Returns: { id: 789, title: "Understanding NestJS", ... }
   */

  public async createPost(@Body() createPostDto: CreatePostDto) {
    // Find the author by ID
    let author = await this.usersService.getUserById({
      id: createPostDto.authorId,
    });
    if (!author) {
      throw new UnauthorizedException('Author not found or unauthorized');
    }

    let tags = await this.tagService.findMultipleTags(createPostDto.tags || []);

    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    try {
      post = await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }

    return post;
  }

  /**
   * Deletes a post by its ID.
   *
   * This method removes a post from the system based on the provided post ID.
   * It handles potential errors during the deletion process and returns a
   * confirmation of the deletion.
   *
   * @param {number} id - The unique identifier of the post to be deleted
   * @returns {object} Confirmation of deletion with post ID
   * @memberof PostsService
   * @example
   * const result = await postsService.delete(456);
   * // Returns: { deleted: true, id: 456 }
   */

  public async delete(id: number) {
    try {
      await this.postsRepository.delete(id);
      return {
        deleted: true,
        id,
      };
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }
  }

  /**
   * Updates an existing post with new information.
   *
   * This method modifies a post's details based on the provided patch data,
   * including title, content, tags, and other metadata. It ensures that the
   * post exists before attempting to update it and handles potential errors.
   *
   * @param {PatchPostDto} patchPostDto - Data transfer object containing post updates
   * @returns {object} The updated post object
   * @memberof PostsService
   * @example
   * const updatedPost = await postsService.patchPost({
   *   id: 456,
   *   title: "Updated Post Title",
   * });
   * // Returns: { id: 456, title: "Updated Post Title", ... }
   */
  public async patchPost(patchPostDto: PatchPostDto) {
    // Find the tags
    let tags = await this.tagService.findMultipleTags(patchPostDto.tags || []);

    let post: Posts | null = null;
    // Find the post by ID
    try {
      post = await this.postsRepository.findOne({
        where: { id: patchPostDto.id },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }
    if (!post) {
      throw new BadRequestException('Post not found or does not exist', {
        description: 'The post you are trying to update does not exist.',
      });
    }
    // Update the post with the provided data
    post.title = patchPostDto.title ?? post?.title;
    post.content = patchPostDto.content ?? post?.content;
    post.postType = patchPostDto.postType ?? post?.postType;
    post.slug = patchPostDto.slug ?? post?.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post?.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post?.publishOn;

    // Assign the new tags
    post.tags = tags; // Update the tags
    // Save the post and return

    try {
      post = await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }

    return post;
  }

  /**
   * Creates multiple posts in the system.
   *
   * This method accepts an array of post data transfer objects and creates
   * each post in a transaction. If any post creation fails, the transaction
   * is rolled back to maintain data integrity.
   *
   * @param {CreateManyPostsDto} createManyPostsDto - Data transfer object containing multiple posts
   * @returns {Promise<Posts[]>} Array of created post objects
   * @throws {BadRequestException} If no posts are provided for creation
   * @memberof PostsService
   */

  public async createManyPosts(createManyPostsDto: CreateManyPostsDto) {
    if (
      !createManyPostsDto ||
      !createManyPostsDto.posts ||
      createManyPostsDto.posts.length === 0
    ) {
      throw new BadRequestException('No posts provided for creation');
    }

    const createdPosts: Posts[] = [];

    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }
    try {
      for (const postData of createManyPostsDto.posts) {
        const createdPost = await this.createPost(postData);
        createdPosts.push(createdPost);
      }
      await queryRunner.commitTransaction();
      return createdPosts;
    } catch (error) {
      console.error('Error creating multiple posts:', error);
      await queryRunner.rollbackTransaction();
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error saving the posts to the database.',
        },
      );
    } finally {
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException(
          'Unable to process your request at the moment please try later',
          {
            description: 'Error releasing the database connection.',
          },
        );
      }
    }
  }
}
