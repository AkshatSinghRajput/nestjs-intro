import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from '../../config/auth.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/services/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authentication(googleTokenDto: GoogleTokenDto) {
    try {
      // Verify the Google token sent by the client
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      // Extract the payload from the token
      const payload = loginTicket.getPayload();
      if (!payload) {
        throw new BadRequestException('Invalid Google Token');
      }
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = payload;
      // Find the user in the database using the Google ID
      const user = await this.usersService.getUserByGoogleId(googleId);
      // If Google ID exists generate tokens
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      }
      // If not create a new user in the database with the Google ID and then generate tokens
      const newUser = await this.usersService.createGoogleUser({
        email: email as string,
        googleId,
        firstName: firstName as string,
        lastName: lastName as string,
      });

      return this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      // throw and UnauthorizedException if the token is invalid
      throw new UnauthorizedException(error);
    }
  }
}
