import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './services/posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    // Inject any required services here, e.g., PostsService
    private readonly postsService: PostsService,
  ) {}
  @Get('/:userId')
  public getPosts(
    @Param('userId') userId: string, // Use Param decorator to get userId from the route
  ) {
    return this.postsService.findAll(userId);
  }
}
