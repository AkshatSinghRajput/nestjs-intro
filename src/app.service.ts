import { Injectable } from '@nestjs/common';

/**
 * Main application service that provides core business logic.
 *
 * This service contains the primary application logic and serves as the foundation
 * for the root-level functionality. It provides basic operations that can be
 * extended as the application grows.
 *
 * @service AppService
 * @description Core application service for basic operations
 */
@Injectable()
export class AppService {
  /**
   * Returns a simple greeting message.
   *
   * This method provides a basic health check functionality and serves
   * as a simple way to verify that the service layer is working correctly.
   *
   * @returns {string} A simple greeting message
   * @memberof AppService
   * @example
   * const message = appService.getHello();
   * // Returns: "Hello World!"
   */
  getHello(): string {
    return 'Hello World!';
  }
}
