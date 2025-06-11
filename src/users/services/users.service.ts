import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService)) // Use forwardRef to avoid circular dependency issues
    private readonly authService: AuthService, // Assuming AuthService is imported from the correct path
  ) {}

  public getUsers(
    getUserParamsDto: GetUserParamsDto,
    limit: number,
    page: number,
  ) {
    console.log('GetUserParamsDto:', getUserParamsDto);
    console.log('Limit:', limit);
    console.log('Page:', page);

    if (this.authService.isAuth()) {
      return [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@fo.com',
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'janeDoe@gp.com',
        },
      ];
    }
    throw new Error('Unauthorized access');
  }

  public getUserById(getUserParamsDto: GetUserParamsDto) {
    const { id } = getUserParamsDto;
    console.log('Get user by ID:', id);
    return {
      id: 1231,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@hao.com',
    };
  }
}
