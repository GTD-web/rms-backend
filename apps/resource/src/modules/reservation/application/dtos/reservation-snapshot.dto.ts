import { ReservationSnapshot } from '@libs/entities';
import { ApiProperty } from '@nestjs/swagger';
import { EmployeeResponseDto } from '@resource/modules/employee/application/dtos/employee-response.dto';
import { ResourceResponseDto } from '@resource/modules/resource/common/application/dtos/resource-response.dto';
import { IsBoolean, IsDate, IsOptional, IsString, IsUUID, IsArray, IsDateString } from 'class-validator';

export class ParticipantDto {
    @ApiProperty()
    @IsUUID()
    employeeId: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    department: string;
}

export class ResourceDto {
    @ApiProperty()
    @IsUUID()
    resourceId: string;

    @ApiProperty()
    @IsString()
    name: string;
}

export class CreateReservationSnapshotDto {
    @ApiProperty({ required: false })
    @IsOptional()
    resource?: ResourceDto;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    endDate?: string;

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

    @ApiProperty({ required: false, type: () => [ParticipantDto] })
    @IsOptional()
    @IsArray()
    participants?: ParticipantDto[];
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

    @ApiProperty({ required: false, type: () => ResourceDto })
    resource?: ResourceDto;

    @ApiProperty({ required: false })
    title?: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    startDate?: string;

    @ApiProperty({ required: false })
    endDate?: string;

    @ApiProperty({ required: false })
    isAllDay?: boolean;

    @ApiProperty({ required: false })
    notifyBeforeStart?: boolean;

    @ApiProperty({ required: false, type: [Number] })
    notifyMinutesBeforeStart?: number[];

    @ApiProperty({ required: false, type: () => [ParticipantDto] })
    participants?: ParticipantDto[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
