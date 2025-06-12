import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService, // Inject UsersService if needed
  ) {}

  public findAll(userId: string) {
    const user = this.usersService.getUserById({ id: Number(userId) });
    return [
      {
        user: user,
        content: 'This is a post content for user ' + userId,
        createdAt: new Date().toISOString(),
        id: Math.floor(Math.random() * 1000), // Simulating a post ID
      },
      {
        user: user,
        content: 'This is another post content for user ' + userId,
        createdAt: new Date().toISOString(),
        id: Math.floor(Math.random() * 1000) + 1, // Simulating another post ID
      },
    ];
  }

  public createPost(createPostDto: CreatePostDto) {
    // Here you would typically save the post to a database
    // For now, we will just return the DTO as a simulated response
    return {
      id: Math.floor(Math.random() * 1000), // Simulating a post ID
      ...createPostDto,
    };
  }
}
