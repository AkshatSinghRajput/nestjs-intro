import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './services/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProvider } from './providers/create-post.provider';

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
  providers: [PostsService, CreatePostProvider],
  imports: [
    UsersModule,
    TagsModule,
    PaginationModule,
    TypeOrmModule.forFeature([Posts, MetaOption]),
  ],
})
export class PostsModule {}
