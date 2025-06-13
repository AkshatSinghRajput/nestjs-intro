import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

/**
 * Authentication module that handles user authentication and authorization.
 *
 * This module provides authentication services including user login, logout,
 * and authorization checks. It integrates with the Users module to validate
 * user credentials and manage authentication state.
 *
 * @module AuthModule
 * @description Manages authentication and authorization functionality
 */
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [forwardRef(() => UsersModule)], // Import UsersModule with forwardRef if needed
  exports: [AuthService], // Export AuthService if needed in other modules
})
export class AuthModule {}
