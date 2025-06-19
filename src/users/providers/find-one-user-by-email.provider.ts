import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, // Replace 'any' with the actual
  ) {}

  /**
   * Finds a user by their email address.
   *
   * @param {string} email - The email address of the user to find.
   * @returns {Promise<User | null>} - Returns the user if found, otherwise null.
   */
  public async findOneByEmail(email: string) {
    let user: User | null = null;

    try {
      user = await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException('Error while fetching user by email');
    }
    if (!user) {
      throw new BadRequestException('User with this email does not exist', {
        description: 'User not found',
      });
    }
    return user;
  }
}
