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
  /**
   * Creates a new tag in the database.
   *
   * @param {CreateTagDto} createTagDto - The data transfer object containing tag details
   * @returns {Promise<Tag>} - The created tag
   * @throws {RequestTimeoutException} - If there is an error connecting to the database
   */
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

  /**
   * Retrieves all tags from the database.
   *
   * @returns {Promise<Tag[]>} - An array of tags
   * @throws {RequestTimeoutException} - If there is an error connecting to the database
   * @throws {BadRequestException} - If no tags are found in the database
   */
  public async findAllTags() {
    let tags: Tag[] = []; // Initialize an empty array for tags
    try {
      tags = await this.tagsRepository.find(); // Fetch all tags from the database
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to fetch tags, please try again later.',
        {
          description: 'Error connecting to the database.',
        },
      );
    }
    if (tags.length === 0) {
      throw new BadRequestException(
        'No tags found in the database.', // Throw an error if no tags are found
        {
          description: 'The database does not contain any tags.',
        },
      );
    }
    return tags; // Return the list of tags
  }

  /**
   * Finds multiple tags by their IDs.
   *
   * @param {number[]} tagIds - An array of tag IDs to find
   * @returns {Promise<Tag[]>} - An array of found tags
   * @throws {RequestTimeoutException} - If there is an error connecting to the database
   * @throws {HttpException} - If some tags are not found
   */
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

  /**
   * Deletes a tag by its ID.
   *
   * @param {number} tagId - The ID of the tag to delete
   * @returns {Promise<{ deleted: boolean; id: number }>} - An object indicating the deletion status and the ID of the deleted tag
   * @throws {RequestTimeoutException} - If there is an error connecting to the database
   * @throws {BadRequestException} - If the tag does not exist
   */
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

  /**
   * Soft deletes a tag by its ID.
   *
   * @param {number} tagId - The ID of the tag to soft delete
   * @returns {Promise<{ deleted: boolean; id: number }>} - An object indicating the soft deletion status and the ID of the soft-deleted tag
   * @throws {Error} - If the tag does not exist
   */
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
