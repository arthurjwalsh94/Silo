import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.register(username, password);
  }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    // Call the login method in auth.service.ts
    const result = await this.authService.login(username, password);

    // If result is null, credentials were invalid
    if (!result) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Otherwise, return the token
    return {
      success: true,
      token: result.access_token,
    };
  }
}