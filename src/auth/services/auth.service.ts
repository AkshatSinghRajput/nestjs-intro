import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) // Use forwardRef to avoid circular dependency
    private readonly usersService: UsersService, // Assuming UsersService is imported from the correct path
  ) {}

  public login(username: string, password: string, userId?: string) {
    let user = this.usersService.getUserById({
      id: Number(userId),
    });
    return 'Logged in successfully'; // Placeholder for login logic
  }

  public isAuth() {
    return false; // Placeholder for authentication check logic
  }
}
