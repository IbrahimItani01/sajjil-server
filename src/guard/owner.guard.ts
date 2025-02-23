/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'];
    const taskId = request.params.id;

    if (!user || !taskId) {
      throw new ForbiddenException('Access denied');
    }

    const task = await this.prisma.todo.findUnique({
      where: { id: taskId },
      select: { userId: true },
    });
    if (!task || task.userId !== user.sub) {
      throw new ForbiddenException('You do not own this task');
    }

    return true;
  }
}
