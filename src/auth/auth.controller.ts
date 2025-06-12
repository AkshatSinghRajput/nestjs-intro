import { Controller, Get } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth') // Use ApiTags to group the controller in Swagger documentation
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
