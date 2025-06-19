import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserCreateManyProvider } from './providers/user-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import profileConfig from './config/profile.config';

/**
 * Users module that manages user-related functionality.
 *
 * This module provides comprehensive user management capabilities including
 * user creation, retrieval, updates, and user data management. It integrates
 * with the Authentication module to provide secure user operations.
 *
 * @module UsersModule
 * @description Manages user-related operations and data
 */
@Module({
  controllers: [UsersController],
  providers: [UsersService, UserCreateManyProvider, CreateUserProvider, FindOneUserByEmailProvider],
  exports: [UsersService], // Export UsersService if needed in other modules
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]), // Import User entity for TypeORM
    ConfigModule.forFeature(profileConfig),
  ],
})
export class UsersModule {}
