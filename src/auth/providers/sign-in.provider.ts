import {
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/services/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/auth.config'; // Assuming jwtConfig is defined in your project
import { ActiveUserInterface } from '../interface/active-user.interface';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly userServices: UsersService,
    private readonly hashingProvider: HashingProvider, // Assuming HashingProvider is defined
    private readonly jwtService: JwtService, // Assuming JwtService is defined

    @Inject(jwtConfig.KEY) // Injecting the JWT configuration
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  public async signIn(signInDto: SignInDto) {
    let user = await this.userServices.getUserByEmail(signInDto.email);

    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare passwords',
      });
    }
    if (!isEqual) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      } as ActiveUserInterface,
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    return {
      accessToken,
    };
  }
}
