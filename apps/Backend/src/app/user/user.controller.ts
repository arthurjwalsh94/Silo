import { Controller, Post, Get, Body } from '@nestjs/common';
import { UserService } from './user.service';

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
}

