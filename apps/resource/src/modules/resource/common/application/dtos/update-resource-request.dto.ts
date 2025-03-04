import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateResourceDto } from './update-resource.dto';
import { UpdateVehicleInfoDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { UpdateMeetingRoomInfoDto } from '@resource/modules/resource/meeting-room/application/dtos/update-meeting-room-info.dto';
import { UpdateAccommodationInfoDto } from '@resource/modules/resource/accommodation/application/dtos/update-accommodation-info.dto';
import { CreateResourceManagerDto } from './create-resource-manager.dto';

export class UpdateResourceRequestDto {
  @ApiProperty({ required: false, type: UpdateResourceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateResourceDto)
  resource?: UpdateResourceDto;

  @ApiProperty({
    required: false,
    oneOf: [
      { $ref: getSchemaPath(UpdateVehicleInfoDto) },
      { $ref: getSchemaPath(UpdateMeetingRoomInfoDto) },
      { $ref: getSchemaPath(UpdateAccommodationInfoDto) }
    ]
  })
  @IsOptional()
  typeInfo?: UpdateVehicleInfoDto | UpdateMeetingRoomInfoDto | UpdateAccommodationInfoDto;

  @ApiProperty({ required: false, type: [CreateResourceManagerDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateResourceManagerDto)
  managers?: CreateResourceManagerDto[];
} 