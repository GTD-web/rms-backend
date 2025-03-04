import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { ResourceLocation } from './create-resource.dto';

export class UpdateResourceDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, type: 'object' })
  @IsOptional()
  location?: ResourceLocation;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  notifyParticipantChange?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  notifyReservationChange?: boolean;
} 