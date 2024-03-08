import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class TaskService {
  constructor(
    private readonly databaseService: DatabaseService
  ) { }

  async addTask(createTaskDto: Prisma.TaskCreateInput) {
    try {
      const task = await this.databaseService
        .task
        .create({
          data: {
            ...createTaskDto,
          }
        });
      return task
    } catch (error) {
      throw new ConflictException()
    }
  }

  async getAllTasks() {
    return await this.databaseService
      .task
      .findMany();
  }

  async getTasksByuserId(userId: number) {
    return await this.databaseService
      .task
      .findMany({
        where: {
          userId
        }
      })
  }

  async deleteAllTasks() {
    return await this.databaseService
      .task
      .deleteMany()
  }

  async getTaskById(id: number) {
    return await this.databaseService
      .task
      .findUnique({
        where: {id}
      })
  }

  async deleteTaskById(id: number) {
    try {
      const task =  await this.databaseService
        .task
        .delete({
          where: {id}
        })
      return task
    } catch (error) {
      throw new NotFoundException("this task is not found")
    }
  }

  async updateTaskById(id: number, updateTaskDto: Prisma.TaskUpdateInput) {
    return await this.databaseService
    .task
    .update({
      where: {id},
      data: updateTaskDto
    });
  }
}
