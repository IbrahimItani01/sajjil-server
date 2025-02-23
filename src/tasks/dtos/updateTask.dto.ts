/* eslint-disable prettier/prettier */
export class UpdateTaskDto {
    description?: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
    date?: string;
    completed?: boolean;
  }
  