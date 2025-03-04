import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ResourceType } from '@libs/enums/resource-type.enum';

export class UpdateResourceGroupDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, enum: ResourceType })
  @IsEnum(ResourceType)
  @IsOptional()
  type?: ResourceType;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  parentResourceGroupId?: string;
} 