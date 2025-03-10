import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsArray, IsEnum, IsDateString } from 'class-validator';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';

// 예약 제목 변경
export class UpdateReservationTitleDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    title?: string;
}

// 예약 시간 변경
export class UpdateReservationTimeDto {
    @ApiProperty()
    @IsDateString()
    startDate: string;

    @ApiProperty()
    @IsDateString()
    endDate: string;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    isAllDay?: boolean;
}

// 예약 상태 변경
export class UpdateReservationStatusDto {
    @ApiProperty({ enum: ReservationStatus })
    @IsEnum(ReservationStatus)
    status: ReservationStatus;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    rejectReason?: string;
}

// 예약 참가자 변경
export class UpdateReservationParticipantsDto {
    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    participantIds: string[];
}

// 예약 수신참조자 변경
export class UpdateReservationCcReceipientDto {
    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    ccReceipientIds: string[];
}
