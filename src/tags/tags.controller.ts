import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService, // Inject the TagsService for tag operations
  ) {}

  @Get()
  public findAllTags() {
    return this.tagsService.findAllTags(); // Call the service to retrieve all tags
  }

  @Post()
  public createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto); // Call the service to create a new tag
  }

  @Delete()
  public deleteTag(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTag(id); // Call the service to delete a tag by ID
  }

  @Delete('/soft-delete')
  public softDeleteTag(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softDeleteTag(id); // Call the service to soft delete a tag by ID
  }
}
