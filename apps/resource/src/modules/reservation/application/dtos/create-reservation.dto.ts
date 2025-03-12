import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsArray, IsDateString, IsEnum, Matches } from 'class-validator';
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

    @ApiProperty({
        example: '2025-01-01 00:00:00',
        description: '예약 시작 시간 (YYYY-MM-DD HH:mm:ss 형식)',
    })
    @IsDateString()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: '날짜 형식이 올바르지 않습니다. YYYY-MM-DD HH:mm:ss 형식이어야 합니다.',
    })
    startDate: string;

    @ApiProperty({
        example: '2025-01-01 00:00:00',
        description: '예약 종료 시간 (YYYY-MM-DD HH:mm:ss 형식)',
    })
    @IsDateString()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: '날짜 형식이 올바르지 않습니다. YYYY-MM-DD HH:mm:ss 형식이어야 합니다.',
    })
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
