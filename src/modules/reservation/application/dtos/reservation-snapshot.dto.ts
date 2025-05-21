import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEnum,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    IsUUID,
    IsArray,
    IsDateString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AttendeeDto {
    @ApiProperty({ required: false })
    @IsUUID()
    @IsOptional()
    id?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    department?: string;
}

export class DroppableGroupItemDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    order?: number;
}

export class DroppableGroupDataDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ type: [DroppableGroupItemDto], required: false })
    @IsArray()
    @IsOptional()
    items?: DroppableGroupItemDto[];
}

export class DateRangeDto {
    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    from?: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    to?: string;
}

export class TimeInfoDto {
    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    hour?: number;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    minute?: number;
}

export class TimeRangeDto {
    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    am?: boolean;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    pm?: boolean;
}

export class SelectedResourceDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    resourceId?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    resourceName?: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    startDate?: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    endDate?: string;
}

export class ReminderTimeDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    time?: number;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    isSelected?: boolean;
}

export class CreateReservationSnapshotDto {
    @ApiProperty({ enum: ['groups', 'date-time', 'resources', 'info'], required: false })
    @IsEnum(['groups', 'date-time', 'resources', 'info'])
    @IsOptional()
    step?: 'groups' | 'date-time' | 'resources' | 'info';

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    resourceType?: string;

    @ApiProperty({ required: false, type: DroppableGroupDataDto })
    @IsOptional()
    @IsObject()
    droppableGroupData?: DroppableGroupDataDto;

    @ApiProperty({ required: false, type: DateRangeDto })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => DateRangeDto)
    dateRange?: DateRangeDto;

    @ApiProperty({ required: false, type: TimeInfoDto })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TimeInfoDto)
    startTime?: TimeInfoDto;

    @ApiProperty({ required: false, type: TimeInfoDto })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TimeInfoDto)
    endTime?: TimeInfoDto;

    @ApiProperty({ required: false, type: TimeRangeDto })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TimeRangeDto)
    timeRange?: TimeRangeDto;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    timeUnit?: number;

    @ApiProperty({ required: false, type: SelectedResourceDto })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => SelectedResourceDto)
    selectedResource?: SelectedResourceDto;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ required: false, type: [ReminderTimeDto] })
    @IsOptional()
    @IsArray()
    reminderTimes?: ReminderTimeDto[];

    @ApiProperty({ required: false, default: false })
    @IsOptional()
    @IsBoolean()
    isAllDay?: boolean;

    @ApiProperty({ required: false, default: false })
    @IsOptional()
    @IsBoolean()
    notifyBeforeStart?: boolean;

    @ApiProperty({ required: false, type: [Number] })
    @IsOptional()
    @IsArray()
    notifyMinutesBeforeStart?: number[];

    @ApiProperty({ required: false, type: [AttendeeDto] })
    @IsOptional()
    @IsArray()
    attendees?: AttendeeDto[];
}

export class UpdateReservationSnapshotDto extends CreateReservationSnapshotDto {
    @ApiProperty()
    @IsUUID()
    snapshotId: string;
}

export class DateRangeResponseDto {
    @ApiProperty({ required: false })
    from?: Date;

    @ApiProperty({ required: false })
    to?: Date;
}

export class TimeInfoResponseDto {
    @ApiProperty({ required: false })
    hour?: number;

    @ApiProperty({ required: false })
    minute?: number;
}

export class TimeRangeResponseDto {
    @ApiProperty({ required: false })
    am?: boolean;

    @ApiProperty({ required: false })
    pm?: boolean;
}

export class SelectedResourceResponseDto {
    @ApiProperty({ required: false })
    resourceId?: string;

    @ApiProperty({ required: false })
    resourceName?: string;

    @ApiProperty({ required: false })
    startDate?: Date;

    @ApiProperty({ required: false })
    endDate?: Date;
}

export class ReservationSnapshotResponseDto {
    @ApiProperty()
    snapshotId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty({ enum: ['groups', 'date-time', 'resources', 'info'], required: false })
    step?: 'groups' | 'date-time' | 'resources' | 'info';

    @ApiProperty({ required: false })
    resourceType?: string;

    @ApiProperty({ required: false, type: DroppableGroupDataDto })
    droppableGroupData?: DroppableGroupDataDto;

    @ApiProperty({ required: false, type: DateRangeResponseDto })
    dateRange?: DateRangeResponseDto;

    @ApiProperty({ required: false, type: TimeInfoResponseDto })
    startTime?: TimeInfoResponseDto;

    @ApiProperty({ required: false, type: TimeInfoResponseDto })
    endTime?: TimeInfoResponseDto;

    @ApiProperty({ required: false, type: TimeRangeResponseDto })
    timeRange?: TimeRangeResponseDto;

    @ApiProperty({ required: false })
    timeUnit?: number;

    @ApiProperty({ required: false, type: SelectedResourceResponseDto })
    selectedResource?: SelectedResourceResponseDto;

    @ApiProperty({ required: false })
    title?: string;

    @ApiProperty({ required: false, type: [ReminderTimeDto] })
    reminderTimes?: ReminderTimeDto[];

    @ApiProperty({ required: false })
    isAllDay: boolean;

    @ApiProperty({ required: false })
    notifyBeforeStart: boolean;

    @ApiProperty({ required: false, type: [Number] })
    notifyMinutesBeforeStart?: number[];

    @ApiProperty({ required: false, type: [AttendeeDto] })
    attendees?: AttendeeDto[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
