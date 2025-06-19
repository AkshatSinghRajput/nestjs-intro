import {
  Injectable,
  Inject,
  RequestTimeoutException,
  BadRequestException,
} from '@nestjs/common';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UserCreateManyProvider } from '../providers/user-create-many.provider';
import { CreateUserProvider } from '../providers/create-user.provider';
import { FindOneUserByEmailProvider } from '../providers/find-one-user-by-email.provider';

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
    @Inject(profileConfig.KEY) // Inject the configuration for profile
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly userCreateManyProvider: UserCreateManyProvider,

    private readonly createUserProvider: CreateUserProvider,

    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider, // Assuming this provider is defined
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
  public async getUsers(
    getUserParamsDto: GetUserParamsDto,
    limit: number,
    page: number,
  ) {
    let users: User[] = [];
    try {
      await this.usersRepository.find();
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }
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
  public async getUserById(getUserParamsDto: GetUserParamsDto) {
    let user: User | null = null;
    try {
      user = await this.usersRepository.findOneBy({
        id: getUserParamsDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    return user;
  }

  /**
   * Retrieves a user by their email address.
   *
   * This method fetches user information based on the provided email address.
   * It returns the user object if found, or throws an error if the user does not exist.
   *
   * @param {string} email - The email address of the user to find
   * @returns {Promise<User>} The user object if found
   * @throws {BadRequestException} If no user with the provided email exists
   * @memberof UsersService
   */
  public async getUserByEmail(email: string) {
    return this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  /**
   * Creates a new user in the system.
   * This method checks if a user with the provided email already exists,
   * and if not, creates a new user with the provided details.
   * @param {CreateUserDto} createUserDto - Data transfer object containing user details
   * @return {Promise<User>} The newly created user object
   * @throws {Error} If a user with the provided email already exists
   * @memberof UsersService
   * @example
   * const newUser = await usersService.createUser({
   *  firstName: 'Alice',
   * lastName: 'Smith',
   * email: 'aloce@sfafa.com',
   * password: 'password@123',
   * });
   * // Returns: { id: 1, firstName: "Alice", lastName: "Smith", email: "aloce@sfafa.com", ... }
   * */

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * Creates multiple users in the system.
   * This method accepts an array of user data transfer objects and creates
   * each user in a transaction. If any user creation fails, the transaction
   * is rolled back to maintain data integrity.
   *  @param {CreateUserDto[]} createUserDtos - Array of user data transfer objects
   * @return {Promise<void>} Resolves when all users are created successfully
   * @throws {Error} If any user creation fails, the transaction is rolled back
   * @memberof UsersService
   */

  public async createMany(createUserDtos: CreateUserDto[]) {
    return this.userCreateManyProvider.createMany(createUserDtos);
  }
}
