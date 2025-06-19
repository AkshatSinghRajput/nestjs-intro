import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/services/users.service';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly userServices: UsersService,
    private readonly hashingProvider: HashingProvider, // Assuming HashingProvider is defined
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
    return true;
  }
}
