import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateVehicleInfoDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  leftMileage?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  totalMileage?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  insuranceName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  insuranceNumber?: string;

  @ApiProperty({ required: false, type: [String], description: '주차위치 이미지 배열' })
  @IsOptional()
  @IsArray()
  parkingLocationImages?: string[];

  @ApiProperty({ required: false, type: [String], description: '계기판 이미지 배열' })
  @IsOptional()
  @IsArray()
  odometerImages?: string[];
} 