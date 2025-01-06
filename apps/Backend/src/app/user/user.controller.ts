import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body('username') username: string) {
    return this.userService.createUser(username);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // Protected route example
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    // req.user comes from the JWTStrategy validate() return value
    return req.user;
  }
}