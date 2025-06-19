import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { SignInProvider } from '../providers/sign-in.provider';
import { SignInDto } from '../dtos/signin.dto';

/**
 * Authentication service that provides authentication and authorization logic.
 *
 * This service handles user authentication operations including login validation,
 * session management, and authorization checks. It integrates with the UsersService
 * to validate user credentials and retrieve user information.
 *
 * @service AuthService
 * @description Provides authentication and authorization functionality
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService.
   *
   * @param {UsersService} usersService - The injected users service for user operations
   * @memberof AuthService
   */
  constructor(private readonly signInProvider: SignInProvider) {}

  /**
   * Signs in a user with the provided credentials.
   *
   * @param {SignInDto} signInDto - The data transfer object containing user credentials
   * @returns {Promise<any>} A promise that resolves to the result of the sign-in operation
   * @throws {UnauthorizedException} If the credentials are invalid
   * @memberof AuthService
   */

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }
}
