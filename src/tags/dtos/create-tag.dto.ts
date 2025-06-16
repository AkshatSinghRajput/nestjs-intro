import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'The name of the tag',
    example: 'Technology',
    type: String,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty({
    description: 'The unique slug for the tag',
    example: 'technology',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be lowercase and can only contain letters, numbers, and hyphens.',
  })
  @MaxLength(256)
  slug: string;

  @ApiPropertyOptional({
    description: 'Optional description for the tag',
    example: 'Posts related to technology topics',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'JSON schema for the tag',
    example: '{"type": "object", "properties": {"key": {"type": "string"}}}',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'URL of the featured image for the tag',
    example: 'https://example.com/image.jpg',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(1024)
  featuredImage?: string;
}
