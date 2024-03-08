import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/guards/jwt.guards';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() userLogin: { email: string, password: string }) {
    const { email, password } = userLogin
    const user = await this.userService.validateUser({ email, password });
    return this.userService.login(user);
  }

  @Get("getAllUser")
  @UseGuards(AuthGuard)
  findAllUsers() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findUserById(@Param('id') id: string) {
    return this.userService.findUserById(parseInt(id));
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(parseInt(id));
  }

  @Delete()
  deleteAllUsers() {
    return this.userService.deleteAllUsers()
  }

}
