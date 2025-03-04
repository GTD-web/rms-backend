import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMaintenanceDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  cost?: string;

  @ApiProperty({ required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  maintenanceDate?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  maintenanceShop?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  mileage?: string;
} 