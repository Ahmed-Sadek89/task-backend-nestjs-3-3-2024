import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/guards/jwt.guards';


@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post('addNewTask')
  @UseGuards(AuthGuard)
  async addTask(@Body() createTaskDto: Prisma.TaskCreateInput) {
    return this.taskService.addTask(createTaskDto);
  }

  @Get('getAllTasks')
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get("user/:userId")
  @UseGuards(AuthGuard)
  async getTasksByuserId(@Param("userId") userId: string) {
    return this.taskService.getTasksByuserId(parseInt(userId, 10))
  }

  @Delete('deleteAllTasks')
  async deleteAllTasks() {
    return this.taskService.deleteAllTasks()
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTaskbyId(@Param('id') id: string) {
    return this.taskService.getTaskById(+id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteTaskById(@Param('id') id: string) {
    return this.taskService.deleteTaskById(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateTaskDto: Prisma.TaskUpdateInput) {
    return this.taskService.updateTaskById(+id, updateTaskDto);
  }

}
