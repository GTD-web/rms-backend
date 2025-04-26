import { ApiProperty } from '@nestjs/swagger';
import { EmployeeResponseDto } from '@resource/modules/employee/application/dtos/employee-response.dto';
import { ResourceResponseDto } from '@resource/modules/resource/common/application/dtos/resource-response.dto';
import { IsBoolean, IsDate, IsOptional, IsString, IsUUID, IsArray } from 'class-validator';

export class ParticipantDto {
    @ApiProperty()
    @IsUUID()
    employeeId: string;
}

export class CreateReservationSnapshotDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsUUID()
    resourceId?: string;

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
    @IsDate()
    startDate?: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDate()
    endDate?: Date;

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

    @ApiProperty({ required: false })
    resourceId?: string;

    @ApiProperty({ required: false })
    title?: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    startDate?: Date;

    @ApiProperty({ required: false })
    endDate?: Date;

    @ApiProperty({ required: false })
    isAllDay?: boolean;

    @ApiProperty({ required: false })
    notifyBeforeStart?: boolean;

    @ApiProperty({ required: false, type: [Number] })
    notifyMinutesBeforeStart?: number[];

    @ApiProperty({ required: false, type: () => ResourceResponseDto })
    resource?: ResourceResponseDto;
    
    @ApiProperty({ required: false, type: () => [EmployeeResponseDto] })
    participants?: EmployeeResponseDto[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
} 