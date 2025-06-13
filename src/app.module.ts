import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

/**
 * The root application module that bootstraps and organizes the entire NestJS application.
 *
 * This module serves as the entry point for the application and imports all feature modules
 * including Users, Posts, and Authentication functionality. It defines the core application
 * structure and dependency injection container.
 *
 * @module AppModule
 * @description Main application module that configures the NestJS application
 */
@Module({
  imports: [UsersModule, PostsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
