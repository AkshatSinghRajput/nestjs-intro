import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider)) // Inject the HashingProvider for password hashing
    private readonly hashingProvider: HashingProvider, // Assuming you have a HashingProvider for password hashing
  ) {}

  /**
   * Creates a new user in the system.
   * This method checks if a user with the provided email already exists,
   * and if not, creates a new user with the provided details.
   * @param {CreateUserDto} createUserDto - Data transfer object containing user details
   * @return {Promise<User>} The newly created user object
   * @throws {Error} If a user with the provided email already exists
   * @memberof UsersService
   * @example
   * const newUser = await usersService.createUser({
   *  firstName: 'Alice',
   * lastName: 'Smith',
   * email: 'aloce@sfafa.com',
   * password: 'password@123',
   * });
   * // Returns: { id: 1, firstName: "Alice", lastName: "Smith", email: "aloce@sfafa.com", ... }
   * */

  public async createUser(createUserDto: CreateUserDto) {
    // Check if the user already exists
    let existingUser: User | null = null;
    try {
      existingUser = await this.usersRepository.findOneBy({
        email: createUserDto.email,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException('The user with this email already exists.');
    }

    // Create a new user instance
    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password), // Hash the password
    });

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error saving the user to the database.',
        },
      );
    }
    return newUser;
  }
}
