import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Main application controller that handles root-level HTTP requests.
 *
 * This controller provides the basic endpoints for the application root path.
 * It serves as the entry point for testing application connectivity and
 * basic functionality verification.
 *
 * @controller AppController
 * @description Handles HTTP requests for the application root endpoints
 */
@Controller()
export class AppController {
  /**
   * Creates an instance of AppController.
   *
   * @param {AppService} appService - The injected application service
   * @memberof AppController
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Handles GET requests to the root path ('/').
   *
   * Returns a simple greeting message to verify that the application
   * is running and responding to HTTP requests correctly.
   *
   * @returns {string} A greeting message from the application
   * @memberof AppController
   * @example
   * GET /
   * // Returns: "Hello World!"
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
