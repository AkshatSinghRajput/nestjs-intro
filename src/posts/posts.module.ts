import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './services/posts.service';
import { UsersModule } from 'src/users/users.module';

/**
 * Posts module that manages post-related functionality.
 *
 * This module provides comprehensive post management capabilities including
 * post creation, retrieval, updates, and post data management. It integrates
 * with the Users module to associate posts with their authors and manage
 * user-specific post operations.
 *
 * @module PostsModule
 * @description Manages post-related operations and data
 */
@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UsersModule],
})
export class PostsModule {}
