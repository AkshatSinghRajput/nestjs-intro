import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';
import { AuthService } from 'src/auth/services/auth.service';

/**
 * Users service that provides user-related business logic and data operations.
 *
 * This service handles all user-related operations including user retrieval,
 * user management, and integration with authentication services. It provides
 * the core business logic for user operations throughout the application.
 *
 * @service UsersService
 * @description Provides user management and data operations
 */
@Injectable()
export class UsersService {
  /**
   * Creates an instance of UsersService.
   *
   * @param {AuthService} authService - The injected authentication service
   * @memberof UsersService
   */
  constructor(
    @Inject(forwardRef(() => AuthService)) // Use forwardRef to avoid circular dependency issues
    private readonly authService: AuthService, // Assuming AuthService is imported from the correct path
  ) {}

  /**
   * Retrieves a paginated list of users with optional filtering.
   *
   * This method returns a list of users based on the provided parameters,
   * with support for pagination and authentication checks. It verifies
   * user authorization before returning sensitive user data.
   *
   * @param {GetUserParamsDto} getUserParamsDto - Parameters for user filtering
   * @param {number} limit - Maximum number of users to return
   * @param {number} page - Page number for pagination
   * @returns {object[]} Array of user objects
   * @throws {Error} When user is not authenticated
   * @memberof UsersService
   * @example
   * const users = usersService.getUsers({}, 10, 1);
   * // Returns: [{ firstName: "John", lastName: "Doe", email: "johndoe@fo.com" }, ...]
   */
  public getUsers(
    getUserParamsDto: GetUserParamsDto,
    limit: number,
    page: number,
  ) {
    console.log('GetUserParamsDto:', getUserParamsDto);
    console.log('Limit:', limit);
    console.log('Page:', page);

    if (this.authService.isAuth()) {
      return [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@fo.com',
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'janeDoe@gp.com',
        },
      ];
    }
    throw new Error('Unauthorized access');
  }

  /**
   * Retrieves a specific user by their unique identifier.
   *
   * This method fetches user information based on the provided user ID
   * and returns detailed user data including personal information and
   * contact details.
   *
   * @param {GetUserParamsDto} getUserParamsDto - Parameters containing the user ID
   * @returns {object} User object with detailed information
   * @memberof UsersService
   * @example
   * const user = usersService.getUserById({ id: 1231 });
   * // Returns: { id: 1231, firstName: "John", lastName: "Doe", email: "john@hao.com" }
   */
  public getUserById(getUserParamsDto: GetUserParamsDto) {
    const { id } = getUserParamsDto;
    console.log('Get user by ID:', id);
    return {
      id: 1231,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@hao.com',
    };
  }
}
