import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
} from 'class-validator';

/**
 * Data Transfer Object for creating a new user.
 *
 * This DTO defines the structure and validation rules for user creation
 * requests. It includes comprehensive validation for user data including
 * name constraints, email format validation, and secure password requirements.
 *
 * @class CreateUserDto
 * @description Validates and structures user creation data
 */
export class CreateUserDto {
  /**
   * The user's first name.
   *
   * Must be a string between 3 and 96 characters long.
   * This field is required for user identification and personalization.
   *
   * @type {string}
   * @memberof CreateUserDto
   * @example "John"
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  /**
   * The user's last name.
   *
   * Optional string field between 3 and 96 characters long.
   * Provides additional user identification information.
   *
   * @type {string}
   * @memberof CreateUserDto
   * @example "Doe"
   */
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName: string;

  /**
   * The user's password.
   *
   * Must be a secure password between 8 and 128 characters containing:
   * - At least one uppercase letter
   * - At least one lowercase letter
   * - At least one number
   * - At least one special character (@$!%*?&)
   *
   * @type {string}
   * @memberof CreateUserDto
   * @example "SecurePass123!"
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.',
    },
  )
  password: string;

  /**
   * The user's email address.
   *
   * Must be a valid email format and is required for account creation.
   * Used for user authentication and communication.
   *
   * @type {string}
   * @memberof CreateUserDto
   * @example "john.doe@example.com"
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
