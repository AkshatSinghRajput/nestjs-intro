import { Controller, Get } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiTags } from '@nestjs/swagger';

/**
 * Authentication controller that handles HTTP requests related to user authentication.
 *
 * This controller provides endpoints for user authentication operations such as
 * login, logout, and authentication status checks. It integrates with the
 * AuthService to handle authentication business logic.
 *
 * @controller AuthController
 * @description Handles authentication-related HTTP requests
 */
@Controller('auth')
@ApiTags('Auth') // Use ApiTags to group the controller in Swagger documentation
export class AuthController {
  /**
   * Creates an instance of AuthController.
   *
   * @param {AuthService} authService - The injected authentication service
   * @memberof AuthController
   */
  constructor(private readonly authService: AuthService) {}
}
