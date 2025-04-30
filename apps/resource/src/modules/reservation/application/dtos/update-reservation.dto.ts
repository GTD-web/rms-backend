import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsBoolean,
    IsOptional,
    IsArray,
    IsEnum,
    IsDateString,
    Matches,
    Length,
    ValidateNested,
} from 'class-validator';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { Reservation } from '@libs/entities/reservation.entity';
import { DateUtil } from '@libs/utils/date.util';
import { Type } from 'class-transformer/types';
// 예약 제목 변경
export class UpdateReservationTitleDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @Length(0, 100)
    title?: string;
}

// 예약 시간 변경
export class UpdateReservationTimeDto {
    constructor(reservation?: Reservation) {
        this.startDate = DateUtil.format(reservation?.startDate);
        this.endDate = DateUtil.format(reservation?.endDate);
        this.isAllDay = reservation?.isAllDay;
    }
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

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    isAllDay?: boolean;

    getPropertiesAndTypes() {
        return Object.getOwnPropertyNames(this).map((property) => ({
            property,
            type: Reflect.getMetadata('design:type', this, property),
        }));
    }
}

// 예약 상태 변경
export class UpdateReservationStatusDto {
    @ApiProperty({ enum: ReservationStatus })
    @IsEnum(ReservationStatus)
    status: ReservationStatus;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @Length(0, 100)
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

// 예약 수정
export class UpdateReservationDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    resourceId?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Length(0, 100)
    title?: string;

    @ApiProperty({
        example: '2025-01-01 00:00:00',
        description: '예약 시작 시간 (YYYY-MM-DD HH:mm:ss 형식)',
    })
    @IsDateString()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: '날짜 형식이 올바르지 않습니다. YYYY-MM-DD HH:mm:ss 형식이어야 합니다.',
    })
    @IsOptional()
    startDate?: string;

    @ApiProperty({
        example: '2025-01-01 00:00:00',
        description: '예약 종료 시간 (YYYY-MM-DD HH:mm:ss 형식)',
    })
    @IsDateString()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: '날짜 형식이 올바르지 않습니다. YYYY-MM-DD HH:mm:ss 형식이어야 합니다.',
    })
    @IsOptional()
    endDate?: string;

    @ApiProperty({ example: false })
    @IsBoolean()
    @IsOptional()
    isAllDay?: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    @IsOptional()
    notifyBeforeStart?: boolean;

    @ApiProperty({ required: false, type: [Number], example: [10, 20] })
    @IsArray()
    @IsOptional()
    notifyMinutesBeforeStart?: number[];

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    participantIds?: string[];
}
