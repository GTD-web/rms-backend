import { ReservationSnapshot } from '@libs/entities';
import { ApiProperty } from '@nestjs/swagger';
import { EmployeeResponseDto } from '@resource/modules/employee/application/dtos/employee-response.dto';
import { ResourceResponseDto } from '@resource/modules/resource/common/application/dtos/resource-response.dto';
import {
    IsBoolean,
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    IsUUID,
    IsArray,
    IsDateString,
} from 'class-validator';

export class AttendeeDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    department: string;
}

export class DroppableGroupItemDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNumber()
    order: number;
}

export class DroppableGroupDataDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ type: [DroppableGroupItemDto] })
    @IsArray()
    items: DroppableGroupItemDto[];
}

export class ReminderTimeDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsNumber()
    time: number;

    @ApiProperty()
    @IsBoolean()
    isSelected: boolean;
}

export class CreateReservationSnapshotDto {
    @ApiProperty({ enum: ['groups', 'date-time', 'resources', 'info'] })
    @IsEnum(['groups', 'date-time', 'resources', 'info'])
    step: 'groups' | 'date-time' | 'resources' | 'info';

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
    ReminderTimes?: ReminderTimeDto[];

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

    @ApiProperty({ enum: ['groups', 'date-time', 'resources', 'info'] })
    step: 'groups' | 'date-time' | 'resources' | 'info';

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

    @ApiProperty()
    am: boolean;

    @ApiProperty()
    pm: boolean;

    @ApiProperty()
    timeUnit: number;

    @ApiProperty()
    resourceId: string;

    @ApiProperty()
    resourceName: string;

    @ApiProperty({ required: false })
    selectedStartDate?: Date;

    @ApiProperty({ required: false })
    selectedEndDate?: Date;

    @ApiProperty({ required: false })
    title?: string;

    @ApiProperty({ required: false, type: [ReminderTimeDto] })
    ReminderTimes?: ReminderTimeDto[];

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
