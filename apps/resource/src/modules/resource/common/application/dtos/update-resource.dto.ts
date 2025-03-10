import { IsString, IsOptional, IsBoolean, IsArray, IsEnum, ValidateNested } from 'class-validator';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UpdateVehicleInfoDto } from '@resource/modules/resource/vehicle/application/dtos/update-vehicle-info.dto';
import { UpdateMeetingRoomInfoDto } from '@resource/modules/resource/meeting-room/application/dtos/update-meeting-room-info.dto';
import { UpdateAccommodationInfoDto } from '@resource/modules/resource/accommodation/application/dtos/update-accommodation-info.dto';
import { CreateResourceManagerDto, ResourceLocation } from './create-resource.dto';
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

export class UpdateResourceInfoDto {
    @ApiProperty({ required: false, type: UpdateResourceDto })
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateResourceDto)
    resource?: UpdateResourceDto;

    @ApiProperty({ required: false, type: [CreateResourceManagerDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateResourceManagerDto)
    managers?: CreateResourceManagerDto[];
}

// 차량 반납
export class ReturnVehicleDto {
    @ApiProperty()
    location: ResourceLocation;

    @ApiProperty()
    @IsString()
    leftMileage: string;

    @ApiProperty()
    @IsString()
    totalMileage: string;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    parkingLocationImages: string[];

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    odometerImages: string[];
}
