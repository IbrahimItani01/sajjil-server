/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dtos/createTask.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
}
