import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Bootstrap function that initializes and configures the NestJS application.
 *
 * This function serves as the entry point for the application, setting up:
 * - Global validation pipes for request validation
 * - Swagger/OpenAPI documentation
 * - Server configuration and startup
 *
 * The application includes comprehensive validation, API documentation,
 * and proper error handling for production-ready deployment.
 *
 * @async
 * @function bootstrap
 * @description Initializes and starts the NestJS application
 * @example
 * // Application startup
 * bootstrap();
 * // Server starts on http://localhost:3000
 * // API documentation available at http://localhost:3000/api
 */
async function bootstrap() {
  // Create NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Configure global validation pipe for request validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configure Swagger/OpenAPI documentation
  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Nestjs Blog API')
    .addServer('http://localhost:3000')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS for the application
  app.enableCors();

  // Start the application server
  await app.listen(process.env.PORT ?? 3000);
}

// Bootstrap the application
bootstrap();
