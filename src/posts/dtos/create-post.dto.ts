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

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    example: 'Understanding NestJS',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @ApiProperty({
    description: 'Type of the post',
    enum: postTypes,
    example: postTypes.POST,
  })
  @IsEnum(postTypes)
  @IsNotEmpty()
  postType: postTypes;

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

  @ApiProperty({
    description: 'Status of the post',
    enum: postStatus,
    example: postStatus.DRAFT,
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @ApiPropertyOptional({
    description: 'Content of the post',
    example: 'This is a detailed explanation of NestJS.',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  content?: string;

  @ApiPropertyOptional({
    description: 'Schema for the post, if applicable',
    example: '{"key": "value"}',
    required: false,
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured image URL for the post',
    example: 'https://example.com/image.jpg',
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'Published date of the post',
    example: '2023-10-01T12:00:00Z',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

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
