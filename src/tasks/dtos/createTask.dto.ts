/* eslint-disable prettier/prettier */
export class CreateTaskDto {
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  date: string;
  userId: string;
}
