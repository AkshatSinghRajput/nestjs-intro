import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/auth.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokenProvider } from './providers/refresh-token.provider';

/**
 * Authentication module that handles user authentication and authorization.
 *
 * This module provides authentication services including user login, logout,
 * and authorization checks. It integrates with the Users module to validate
 * user credentials and manage authentication state.
 *
 * @module AuthModule
 * @description Manages authentication and authorization functionality
 */
@Module({
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider, // Use BcryptProvider as the implementation of HashingProvider
    },
    SignInProvider,
    GenerateTokensProvider,
    RefreshTokenProvider,
  ],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(authConfig), // Import authConfig for configuration
    JwtModule.registerAsync(authConfig.asProvider()),
  ], // Import UsersModule with forwardRef if needed
  exports: [AuthService, HashingProvider], // Export AuthService if needed in other modules
})
export class AuthModule {}
