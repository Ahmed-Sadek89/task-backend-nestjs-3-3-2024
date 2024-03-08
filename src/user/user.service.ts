import { Injectable, UnauthorizedException, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) { }

  async register(createUserDto: Prisma.UserCreateInput) {
    const hashedPassword = await this.bcryptService.hashPassword(createUserDto.password)
    try {
      const addUser = await this.databaseService
        .user
        .create({
          data: { ...createUserDto, password: hashedPassword }
        });
      const { password, ...otherUserInformation } = addUser;
      return otherUserInformation;
    } catch (error) {
      throw new ConflictException("Email address already exists")
    }
  }

  async validateUser(userInfo: { email: string, password: string }) {
    const user = await this.findByEmail(userInfo.email)
    if (!user) {
      throw new UnauthorizedException('email is not found!')
    } 
    const isValidPassword = await this.bcryptService.comparePasswords(userInfo.password, user.password)
    if (!isValidPassword) {
      throw new UnauthorizedException('Password is not correct');
    }
    const {password, ...others} = user
    return others
  }

  async login(user: {username: string, email: string, URLImage: string}) {
    const payload = { user };
    return {
      status: "200",
      message: "login success",
      authorization: this.jwtService.sign(payload),
    };
  }

  findByEmail(email: string) {
    return this.databaseService
      .user
      .findUnique({
        where: { email }
      })
  }

  findAllUser() {
    return this.databaseService
      .user
      .findMany({
        orderBy: {
          id: "desc"
        }
      });
  }

  async findUserById(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
    })
    if (!user) {
      throw new NotFoundException("this user is not found")
    }
    return user
  }

  async deleteUser(id: number) {
    return await this.databaseService.user.delete({
      where: { id }
    });
  }

  async deleteAllUsers() {
    return await this.databaseService.user.deleteMany()
  }

  

}
