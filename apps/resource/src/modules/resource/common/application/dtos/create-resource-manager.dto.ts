import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateResourceManagerDto {
  @ApiProperty({ description: '직원 ID' })
  @IsString()
  employeeId: string;
} 