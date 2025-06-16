import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostMetaOptionDto {
  @ApiProperty({
    description: 'The JSON value for the meta option',
    example: '{"key": "value"}',
    type: String,
  })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
