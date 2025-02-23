/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dtos/createTask.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    return this.prisma.todo.create({
      data: {
        description: createTaskDto.description,
        priority: createTaskDto.priority,
        date: createTaskDto.date,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.todo.findMany({
      where: { userId },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.todo.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const existingTask = await this.prisma.todo.findUnique({ where: { id } });
    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.todo.update({
      where: { id },
      data: {
        description: updateTaskDto.description ?? existingTask.description,
        priority: updateTaskDto.priority ?? existingTask.priority,
        date: updateTaskDto.date ?? existingTask.date,
        completed: updateTaskDto.completed ?? existingTask.completed,
      },
    });
  }

  async remove(id: string) {
    const task = await this.prisma.todo.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.prisma.todo.delete({ where: { id } });
  }
}
