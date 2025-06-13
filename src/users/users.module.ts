import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { AuthModule } from 'src/auth/auth.module';

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
  providers: [UsersService],
  exports: [UsersService], // Export UsersService if needed in other modules
  imports: [forwardRef(() => AuthModule)], // Import other modules if needed
})
export class UsersModule {}
