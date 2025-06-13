import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsEnum,
  IsUrl,
  IsArray,
  Matches,
  IsJSON,
  IsISO8601,
  ValidateNested,
} from 'class-validator';
import { postTypes } from '../enums/post-types.enum';
import { postStatus } from '../enums/post-status.enum';
import { CreatePostMetaOptionDto } from './create-post-meta-option.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a new post.
 *
 * This DTO defines the comprehensive structure and validation rules for post creation
 * requests. It includes validation for post content, metadata, categorization,
 * and publishing information with support for rich content features like tags,
 * featured images, and custom meta options.
 *
 * @class CreatePostDto
 * @description Validates and structures post creation data with comprehensive content management
 */
export class CreatePostDto {
  /**
   * The title of the post.
   *
   * Must be at least 4 characters long and serves as the primary
   * identifier for the post content. Used for display and SEO purposes.
   *
   * @type {string}
   * @memberof CreatePostDto
   * @example "Understanding NestJS"
   */
  @ApiProperty({
    description: 'Title of the post',
    example: 'Understanding NestJS',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  /**
   * The type/category of the post.
   *
   * Defines the content type using predefined post types enum.
   * Helps categorize and organize different types of content.
   *
   * @type {postTypes}
   * @memberof CreatePostDto
   * @example postTypes.POST
   */
  @ApiProperty({
    description: 'Type of the post',
    enum: postTypes,
    example: postTypes.POST,
  })
  @IsEnum(postTypes)
  @IsNotEmpty()
  postType: postTypes;

  /**
   * URL-friendly slug for the post.
   *
   * Must be lowercase and contain only letters, numbers, and hyphens.
   * Used for creating SEO-friendly URLs and unique post identification.
   *
   * @type {string}
   * @memberof CreatePostDto
   * @example "understanding-nestjs"
   */

  @ApiProperty({
    description: 'Unique slug for the post',
    example: 'understanding-nestjs',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be lowercase and can only contain letters, numbers, and hyphens.',
  })
  slug: string;

  /**
   * The publication status of the post.
   *
   * Determines whether the post is published, draft, or in another state.
   * Controls post visibility and accessibility to end users.
   *
   * @type {postStatus}
   * @memberof CreatePostDto
   * @example postStatus.DRAFT
   */
  @ApiProperty({
    description: 'Status of the post',
    enum: postStatus,
    example: postStatus.DRAFT,
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  /**
   * The main content body of the post.
   *
   * Optional field containing the detailed content of the post.
   * Supports rich text and markdown formatting for comprehensive content creation.
   *
   * @type {string}
   * @memberof CreatePostDto
   * @example "This is a detailed explanation of NestJS."
   */
  @ApiPropertyOptional({
    description: 'Content of the post',
    example: 'This is a detailed explanation of NestJS.',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  content?: string;

  /**
   * JSON schema for structured post data.
   *
   * Optional field for storing structured metadata or configuration
   * in JSON format for advanced post customization.
   *
   * @type {string}
   * @memberof CreatePostDto
   * @example '{"key": "value"}'
   */
  @ApiPropertyOptional({
    description: 'Schema for the post, if applicable',
    example: '{"key": "value"}',
    required: false,
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  /**
   * URL of the featured image for the post.
   *
   * Optional field for specifying a featured image that represents
   * the post content. Must be a valid URL format.
   *
   * @type {string}
   * @memberof CreatePostDto
   * @example "https://example.com/image.jpg"
   */
  @ApiPropertyOptional({
    description: 'Featured image URL for the post',
    example: 'https://example.com/image.jpg',
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  /**
   * The scheduled or actual publication date of the post.
   *
   * ISO 8601 formatted date string indicating when the post
   * should be or was published. Used for scheduling and organization.
   *
   * @type {Date}
   * @memberof CreatePostDto
   * @example "2023-10-01T12:00:00Z"
   */
  @ApiPropertyOptional({
    description: 'Published date of the post',
    example: '2023-10-01T12:00:00Z',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  /**
   * Array of tags associated with the post.
   *
   * Optional array of string tags for categorization and searchability.
   * Each tag must be at least 3 characters long and helps with content discovery.
   *
   * @type {string[]}
   * @memberof CreatePostDto
   * @example ["nestjs", "typescript", "backend"]
   */
  @ApiPropertyOptional({
    description: 'Tags associated with the post',
    type: [String],
    example: ['nestjs', 'typescript', 'backend'],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  /**
   * Custom meta options for extended post configuration.
   *
   * Optional array of key-value pairs for storing additional
   * metadata and configuration options specific to the post.
   *
   * @type {CreatePostMetaOptionDto[]}
   * @memberof CreatePostDto
   * @example [{ key: "author", value: "John Doe" }, { key: "category", value: "Programming" }]
   */
  @ApiPropertyOptional({
    description: 'Meta options for the post',
    type: [CreatePostMetaOptionDto],
    example: [
      { key: 'author', value: 'John Doe' },
      { key: 'category', value: 'Programming' },
    ],
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionDto)
  metaOptions?: CreatePostMetaOptionDto[];
}
