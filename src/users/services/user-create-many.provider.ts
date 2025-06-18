import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class UserCreateManyProvider {
  constructor(
    private readonly dataSource: DataSource, // Inject the DataSource for database operations
  ) {}

  /**
   * Creates multiple users in the system.
   * This method accepts an array of user data transfer objects and creates
   * each user in a transaction. If any user creation fails, the transaction
   * is rolled back to maintain data integrity.
   *  @param {CreateUserDto[]} createUserDtos - Array of user data transfer objects
   * @return {Promise<void>} Resolves when all users are created successfully
   * @throws {Error} If any user creation fails, the transaction is rolled back
   * @memberof UsersService
   * @example
   * await usersService.createMany([
   * { firstName: 'Bob', lastName: 'Brown', email: '
   */

  public async createMany(createUserDtos: CreateUserDto[]) {
    let newUsers: User[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database.',
        },
      );
    }

    try {
      for (let user of createUserDtos) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
      return newUsers;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error saving the users to the database.',
        },
      );
    } finally {
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException(
          'Unable to process your request at the moment please try later',
          {
            description: 'Error releasing the database connection.',
          },
        );
      }
    }
  }
}
