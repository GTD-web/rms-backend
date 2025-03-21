import { IsString, IsOptional, IsEnum, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateVehicleInfoDto } from '@resource/modules/resource/vehicle/application/dtos/create-vehicle-info.dto';
import { CreateMeetingRoomInfoDto } from '@resource/modules/resource/meeting-room/application/dtos/create-meeting-room-info.dto';
import { CreateAccommodationInfoDto } from '@resource/modules/resource/accommodation/application/dtos/create-accommodation-info.dto';

export class CreateResourceGroupDto {
    @ApiProperty()
    @IsString()
    parentResourceGroupId: string;

    @ApiProperty({ enum: ResourceType })
    @IsEnum(ResourceType)
    type: ResourceType;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    description?: string;
}

export class CreateResourceManagerDto {
    @ApiProperty({ description: '직원 ID' })
    @IsString()
    employeeId: string;
}

export class ResourceLocation {
    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
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

    @ApiProperty({ type: ResourceLocation })
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

    @ApiProperty({ enum: ResourceType })
    @IsEnum(ResourceType)
    type: ResourceType;
}

export class CreateResourceInfoDto {
    @ApiProperty({ type: CreateResourceDto })
    @ValidateNested()
    @Type(() => CreateResourceDto)
    resource: CreateResourceDto;

    @ApiProperty({
        oneOf: [
            { $ref: getSchemaPath(CreateVehicleInfoDto) },
            { $ref: getSchemaPath(CreateMeetingRoomInfoDto) },
            { $ref: getSchemaPath(CreateAccommodationInfoDto) },
        ],
    })
    typeInfo: CreateVehicleInfoDto | CreateMeetingRoomInfoDto | CreateAccommodationInfoDto;

    @ApiProperty({ type: [CreateResourceManagerDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateResourceManagerDto)
    managers: CreateResourceManagerDto[];
}
