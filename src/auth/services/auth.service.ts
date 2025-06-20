import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SignInProvider } from '../providers/sign-in.provider';
import { SignInDto } from '../dtos/signin.dto';
import { RefreshTokenProvider } from '../providers/refresh-token.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

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
  constructor(
    private readonly signInProvider: SignInProvider,
    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}

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

  /**
   * Refreshes the authentication tokens using the provided refresh token.
   *
   * @param {RefreshTokenDto} refreshTokenDto - The data transfer object containing the refresh token
   * @returns {Promise<any>} A promise that resolves to the new authentication tokens
   * @throws {UnauthorizedException} If the refresh token is invalid
   * @memberof AuthService
   */

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenProvider.refreshTokens(refreshTokenDto);
  }
}
