import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [DatabaseModule, UserModule, TaskModule],
  controllers: [AppController],
  providers: [AppService, BcryptService],
})
export class AppModule {}
