import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRole } from 'generated/prisma';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @Post()
  createUser(
    @Body()
    body: {
      name: string;
      user_name: string;
      password: string;
      role: UserRole;
      created_by?: number;
      updated_by?: number;
    },
  ) {
    return this.userService.create(body);
  }
}
