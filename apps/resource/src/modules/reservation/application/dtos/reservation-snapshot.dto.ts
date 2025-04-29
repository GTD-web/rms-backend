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
} from 'class-validator';

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

    @ApiProperty({ required: false, type: DroppableGroupDataDto })
    @IsOptional()
    @IsObject()
    droppableGroupData?: DroppableGroupDataDto;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    endDate?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    startTime?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    endTime?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    am?: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    pm?: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    timeUnit?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsUUID()
    resourceId?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    resourceName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    selectedStartDate?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    selectedEndDate?: string;

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

export class ReservationSnapshotResponseDto {
    @ApiProperty()
    snapshotId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty({ enum: ['groups', 'date-time', 'resources', 'info'], required: false })
    step?: 'groups' | 'date-time' | 'resources' | 'info';

    @ApiProperty({ required: false, type: DroppableGroupDataDto })
    droppableGroupData?: DroppableGroupDataDto;

    @ApiProperty({ required: false })
    startDate?: Date;

    @ApiProperty({ required: false })
    endDate?: Date;

    @ApiProperty({ required: false })
    startTime?: Date;

    @ApiProperty({ required: false })
    endTime?: Date;

    @ApiProperty({ required: false })
    am: boolean;

    @ApiProperty({ required: false })
    pm: boolean;

    @ApiProperty({ required: false })
    timeUnit: number;

    @ApiProperty({ required: false })
    resourceId: string;

    @ApiProperty({ required: false })
    resourceName: string;

    @ApiProperty({ required: false })
    selectedStartDate?: Date;

    @ApiProperty({ required: false })
    selectedEndDate?: Date;

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
