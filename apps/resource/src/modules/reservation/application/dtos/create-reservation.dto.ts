import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsArray, IsDateString, IsEnum } from 'class-validator';
import { ResourceType } from '@libs/enums/resource-type.enum';

export class CreateReservationDto {
    @ApiProperty()
    @IsString()
    resourceId: string;

    @ApiProperty({ enum: ResourceType })
    @IsEnum(ResourceType)
    resourceType: ResourceType;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: '2025-01-01 00:00:00' })
    @IsDateString()
    startDate: string;

    @ApiProperty({ example: '2025-01-01 00:00:00' })
    @IsDateString()
    endDate: string;

    @ApiProperty({ example: false })
    @IsBoolean()
    isAllDay: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    notifyBeforeStart: boolean;

    @ApiProperty({ required: false, type: [Number], example: [10, 20] })
    @IsArray()
    @IsOptional()
    notifyMinutesBeforeStart?: number[];

    // @ApiProperty({ type: [String] })
    // @IsArray()
    // @IsString({ each: true })
    // reserverIds: string[];

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    participantIds: string[];

    // @ApiProperty({ type: [String] })
    // @IsArray()
    // @IsString({ each: true })
    // ccReceipientIds: string[];
}
