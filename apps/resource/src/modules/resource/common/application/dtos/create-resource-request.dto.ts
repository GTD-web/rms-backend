import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';
import { CreateResourceDto } from './create-resource.dto';
import { CreateVehicleInfoDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
import { CreateMeetingRoomInfoDto } from '@resource/modules/resource/meeting-room/application/dtos/create-meeting-room-info.dto';
import { CreateAccommodationInfoDto } from '@resource/modules/resource/accommodation/application/dtos/create-accommodation-info.dto';
import { CreateResourceManagerDto } from './create-resource-manager.dto';



export class CreateResourceRequestDto {
  @ApiProperty({ type: CreateResourceDto })
  @ValidateNested()
  @Type(() => CreateResourceDto)
  resource: CreateResourceDto;

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(CreateVehicleInfoDto) },
      { $ref: getSchemaPath(CreateMeetingRoomInfoDto) },
      { $ref: getSchemaPath(CreateAccommodationInfoDto) }
    ]
  })
  typeInfo: CreateVehicleInfoDto | CreateMeetingRoomInfoDto | CreateAccommodationInfoDto;

  @ApiProperty({ type: [CreateResourceManagerDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateResourceManagerDto)
  managers: CreateResourceManagerDto[];
} 