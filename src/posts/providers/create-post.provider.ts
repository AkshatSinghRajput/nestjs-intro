import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { TagsService } from 'src/tags/services/tags.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../posts.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/services/users.service';
import { ActiveUserInterface } from 'src/auth/interface/active-user.interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly tagService: TagsService,

    private readonly usersService: UsersService, // Inject UsersService to access user-related operations

    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>, // Inject the Posts repository for database operations
  ) {}
  public async createPost(
    createPostDto: CreatePostDto,
    user: ActiveUserInterface,
  ) {
    // Find the author by ID
    let author;
    try {
      author = await this.usersService.getUserById({
        id: user.sub,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to fetch user information at the moment please try later',
        {
          description: 'Error connecting to the database while fetching user.',
        },
      );
    }

    if (!author) {
      throw new UnauthorizedException('Author not found or unauthorized');
    }

    let tags;
    try {
      tags = await this.tagService.findMultipleTags(createPostDto.tags || []);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to fetch tags information at the moment please try later',
        {
          description: 'Error connecting to the database while fetching tags.',
        },
      );
    }

    if (createPostDto.tags?.length !== tags.length) {
      throw new BadRequestException(
        'Some tags provided do not exist or are invalid',
        {
          description: 'Invalid tags provided in the request.',
        },
      );
    }

    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    try {
      post = await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }

    return post;
  }
}
