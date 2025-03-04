import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateMaintenanceDto {
  @ApiProperty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsString()
  mileage: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cost?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({
    description: '소모품 ID',
    example: 'consumable-123'
  })
  consumableId: string;
} 