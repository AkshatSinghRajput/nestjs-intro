import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../../config/auth.config';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /*
     * Inject JWT services
     */
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract the request from the execution context
    const request = context.switchToHttp().getRequest();

    // Extract the token from the request header
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('No access token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
      console.log(`Access token verified for user: ${request['user']}`);
    } catch (error) {
      console.error('Access token verification failed:', error);
      throw new UnauthorizedException('Invalid access token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') || [];
    return token;
  }
}
