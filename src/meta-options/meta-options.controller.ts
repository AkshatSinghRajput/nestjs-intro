import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './services/meta-options.service';
import { CreatePostMetaOptionDto } from './dtos/create-post-meta-option.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('meta-options')
@ApiTags('Meta Options') // Use ApiTags to group the controller in Swagger documentation
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @ApiOperation({
    summary: 'Create a new meta option',
    description: 'Creates a new meta option for posts with the provided data.',
  })
  @ApiResponse({
    status: 201,
    description: 'Meta option created successfully.',
  })
  @Post()
  public createMetaOption(@Body() createMetaOption: CreatePostMetaOptionDto) {
    return this.metaOptionsService.createMetaOption(createMetaOption);
  }
}
