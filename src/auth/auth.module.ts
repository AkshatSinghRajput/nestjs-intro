import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [forwardRef(() => UsersModule)], // Import UsersModule with forwardRef if needed
  exports: [AuthService], // Export AuthService if needed in other modules
})
export class AuthModule {}
