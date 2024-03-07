import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() userLogin: { email: string, password: string }) {
    const user = await this.userService.login(userLogin);
    return user
  }

  @Get("getAllUser")
  findAllUsers() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return this.userService.findUserById(parseInt(id));
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(parseInt(id));
  }

  @Delete()
  deleteAllUsers() {
    return this.userService.deleteAllUsers()
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.userService.update(+id, updateUserDto);
  }
}
