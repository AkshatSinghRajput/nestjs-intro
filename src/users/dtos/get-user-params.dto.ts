import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

/**
 * Data Transfer Object for user retrieval parameters.
 *
 * This DTO defines the structure and validation rules for user query
 * parameters, specifically for retrieving users by their unique identifier.
 * It provides optional filtering capabilities for user lookup operations.
 *
 * @class GetUserParamsDto
 * @description Validates and structures user query parameters
 */
export class GetUserParamsDto {
  /**
   * Optional user identifier for specific user retrieval.
   *
   * When provided, this ID is used to fetch a specific user.
   * If omitted, the request may return multiple users based on other criteria.
   * The value is automatically transformed from string to number.
   *
   * @type {number}
   * @memberof GetUserParamsDto
   * @example 1234
   */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
