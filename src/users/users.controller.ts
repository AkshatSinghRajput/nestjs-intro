import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './services/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Users controller that handles HTTP requests related to user management.
 *
 * This controller provides RESTful endpoints for user operations including
 * creating, reading, updating users. It supports pagination, filtering,
 * and individual user retrieval with comprehensive validation and documentation.
 *
 * @controller UsersController
 * @description Handles user-related HTTP requests and operations
 */
@Controller('users')
@ApiTags('Users')
export class UsersController {
  /**
   * Creates an instance of UsersController.
   *
   * @param {UsersService} usersService - The injected users service
   * @memberof UsersController
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieves users with optional filtering and pagination.
   *
   * This endpoint can return either a specific user by ID or a paginated list
   * of all users. It supports query parameters for pagination control and
   * path parameters for specific user retrieval.
   *
   * @param {GetUserParamsDto} getUserParamsDto - Path parameters including optional user ID
   * @param {number} limit - Maximum number of users to return (default: 10)
   * @param {number} page - Page number for pagination (default: 1)
   * @returns {object|object[]} Single user object or array of users
   * @memberof UsersController
   * @example
   * GET /users/123?limit=5&page=1
   * // Returns specific user with ID 123
   *
   * GET /users?limit=10&page=2
   * // Returns paginated list of users
   */
  @Get('/{:id}')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Fetch a user by their unique identifier.',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: CreateUserDto, // Assuming CreateUserDto is used for the response
  })
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'The unique identifier of the user',
    type: 'number',
    example: 1234,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'The maximum number of users to return',
    type: 'number',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page number for pagination',
    type: 'number',
    example: 1,
  })
  public getUsers(
    @Param() getUserParamsDto: GetUserParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    if (getUserParamsDto.id) {
      return this.usersService.getUserById(getUserParamsDto);
    }
    return this.usersService.getUsers(getUserParamsDto, limit, page);
  }

  /**
   * Creates a new user in the system.
   *
   * This endpoint accepts user data through the request body and creates
   * a new user account with proper validation and data integrity checks.
   *
   * @param {CreateUserDto} createUserDto - User data for creating new account
   * @returns {string} Success message confirming user creation
   * @memberof UsersController
   * @example
   * POST /users
   * Body: {
   *   "firstName": "John",
   *   "lastName": "Doe",
   *   "email": "john@example.com",
   *   "password": "SecurePass123!"
   * }
   * // Returns: "This action creates a new user"
   */
  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Updates an existing user's information.
   *
   * This endpoint allows partial updates to user information using
   * the PATCH method. Only provided fields will be updated while
   * maintaining data integrity and validation.
   *
   * @param {PatchUserDto} patchUserDto - Partial user data for updates
   * @returns {PatchUserDto} The updated user data
   * @memberof UsersController
   * @example
   * PATCH /users
   * Body: {
   *   "firstName": "Jane"
   * }
   * // Returns: { "firstName": "Jane" }
   */
  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
