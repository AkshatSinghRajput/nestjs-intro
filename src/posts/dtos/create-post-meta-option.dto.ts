import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostMetaOptionDto {
  @ApiProperty({
    description: 'Key for the post meta option',
    example: 'author',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    description: 'Value for the post meta option',
    example: 'John Doe',
  })
  @IsNotEmpty()
  value: any;
}
