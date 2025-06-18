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
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { TagsService } from 'src/tags/services/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

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

    @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>, // Inject the MetaOption repository for metadata operations
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
  public async findAll(userId: string) {
    let user = await this.usersService.getUserById({
      id: parseInt(userId),
    });
    if (!user) {
      throw new UnauthorizedException('User not found or unauthorized');
    }

    let posts: Posts[] = [];
    try {
      posts = await this.postsRepository.find({
        where: { author: { id: user.id } },
      });
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
   * Creates a new post with the provided data.
   *
   * This method processes the post creation data, validates the content,
   * and returns the created post with generated metadata including
   * unique identification and creation timestamp.
   *
   * @param {CreatePostDto} createPostDto - The post data for creation
   * @returns {object} The created post object with generated metadata
   * @memberof PostsService
   * @example
   * const newPost = postsService.createPost({
   *   title: "Understanding NestJS",
   *   content: "NestJS is a powerful framework...",
   *   postType: "POST"
   * });
   * // Returns: { id: 789, title: "Understanding NestJS", ... }
   */
  // public async createPost(createPostDto: CreatePostDto) {
  //   // Check if the post already exists
  //   const existingPost = await this.postsRepository.findOne({
  //     where: { slug: createPostDto.slug },
  //   });

  //   if (existingPost) {
  //     throw new Error('Post already exists with this slug');
  //   }

  //   let newPost = this.postsRepository.create(createPostDto);
  //   newPost = await this.postsRepository.save(newPost);

  //   return newPost;
  // }

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
}
