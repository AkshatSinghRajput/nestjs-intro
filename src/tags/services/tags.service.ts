import {
  BadRequestException,
  HttpException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tags.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) // Assuming Tags is the entity for tags
    private tagsRepository: Repository<Tag>, // Inject the Tag repository for database operations
  ) {}
  public async createTag(createTagDto: CreateTagDto) {
    let tag = this.tagsRepository.create(createTagDto); // Create a new tag instance
    try {
      tag = await this.tagsRepository.save(tag); // Save the new tag to the database
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to create tag, please try again later.',
        {
          description: 'Error connecting to the database.',
        },
      );
    }
    return tag; // Return the created tag
  }

  public async findMultipleTags(tagIds: number[]) {
    let results: Tag[] = [];
    try {
      results = await this.tagsRepository.find({
        where: {
          id: In(tagIds), // Find tags with the specified IDs
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to find tags, please try again later.',
        {
          description: 'Error connecting to the database.',
        },
      );
    }
    if (tagIds.length !== results.length) {
      throw new HttpException(
        'Please check the tag IDs you provided, some tags were not found.',
        404, // Return a 404 error if some tags were not found
        {
          description: 'Some tags were not found in the database.',
        },
      );
    }
    return results; // Return the found tags
  }

  public async deleteTag(tagId: number) {
    let tag: Tag | null = null; // Initialize tag variable
    try {
      tag = await this.tagsRepository.findOne({
        where: {
          id: tagId, // Find the tag by ID
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }
    if (!tag) {
      throw new BadRequestException(
        'Tag not found or does not exist', // Throw an error if the tag does not exist
        {
          description: 'The tag you are trying to delete does not exist.',
        },
      );
    }
    try {
      await this.tagsRepository.delete(tagId); // Delete the tag from the database
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }
    return {
      deleted: true, // Indicate that the tag was deleted
      id: tagId, // Return the ID of the deleted tag
    }; // Return a success message
  }

  public async softDeleteTag(tagId: number) {
    const tag = await this.tagsRepository.findOne({
      where: {
        id: tagId, // Find the tag by ID
      },
    });
    if (!tag) {
      throw new Error('Tag not found'); // Throw an error if the tag does not exist
    }
    await this.tagsRepository.softDelete(tagId); // Soft delete the tag (mark it as deleted without removing it from the database)
    return {
      deleted: true, // Indicate that the tag was soft deleted
      id: tagId, // Return the ID of the soft-deleted tag
    }; // Return a success message
  }
}
