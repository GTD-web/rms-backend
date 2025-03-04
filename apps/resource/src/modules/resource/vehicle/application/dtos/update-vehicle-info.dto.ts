import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class UpdateVehicleInfoDto {

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  insuranceName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  insuranceNumber?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  totalMileage?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  leftMileage?: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  parkingLocationImages?: string[];

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  odometerImages?: string[];

} 
