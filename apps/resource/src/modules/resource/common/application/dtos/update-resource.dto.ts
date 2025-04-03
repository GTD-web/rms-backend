import { IsString, IsOptional, IsBoolean, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateResourceManagerDto, ResourceLocation } from './create-resource.dto';

export class UpdateResourceGroupDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    title?: string;

    // @ApiProperty({ required: false })
    // @IsString()
    // @IsOptional()
    // description?: string;
}

export class UpdateResourceDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    resourceGroupId?: string;

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
    isAvailable?: boolean;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    unavailableReason?: string;

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

export class NewOrderResourceDto {
    @ApiProperty()
    @IsString()
    resourceId: string;

    @ApiProperty()
    @IsNumber()
    newOrder: number;
}

export class UpdateResourceOrdersDto {
    @ApiProperty({ type: [NewOrderResourceDto] })
    @IsArray()
    orders: NewOrderResourceDto[];
}

export class NewOrderResourceGroupDto {
    @ApiProperty()
    @IsString()
    resourceGroupId: string;

    @ApiProperty()
    @IsNumber()
    newOrder: number;
}

export class UpdateResourceGroupOrdersDto {
    @ApiProperty({ type: [NewOrderResourceGroupDto] })
    @IsArray()
    orders: NewOrderResourceGroupDto[];
}
