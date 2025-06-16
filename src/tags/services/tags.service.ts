import { Injectable } from '@nestjs/common';
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
    tag = await this.tagsRepository.save(tag); // Save the new tag to the database
    return tag; // Return the created tag
  }

  public async findMultipleTags(tagIds: number[]) {
    let results = await this.tagsRepository.find({
      where: {
        id: In(tagIds), // Find tags with the specified IDs
      },
    });
    return results; // Return the found tags
  }

  public async deleteTag(tagId: number) {
    const tag = await this.tagsRepository.findOne({
      where: {
        id: tagId, // Find the tag by ID
      },
    });
    if (!tag) {
      throw new Error('Tag not found'); // Throw an error if the tag does not exist
    }
    await this.tagsRepository.delete(tagId); // Remove the tag from the database
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
