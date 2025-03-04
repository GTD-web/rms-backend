import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsBoolean, IsNumber, IsArray } from 'class-validator';

export interface ResourceLocation {
  address: string;
  detailAddress?: string;
}

export class CreateResourceDto {
  @ApiProperty()
  @IsString()
  resourceGroupId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: 'object' })
  @IsOptional()
  location?: ResourceLocation;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty()
  @IsBoolean()
  notifyParticipantChange: boolean;

  @ApiProperty()
  @IsBoolean()
  notifyReservationChange: boolean;
} 