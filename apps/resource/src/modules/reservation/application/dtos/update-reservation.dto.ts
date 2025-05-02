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
import { ERROR_MESSAGE } from '@libs/constants/error-message';

// 예약 제목 변경
export class UpdateReservationTitleDto {
    @ApiProperty({ required: false })
    @IsString({ message: ERROR_MESSAGE.VALIDATION.IS_STRING('제목') })
    @IsOptional()
    @Length(0, 100, { message: ERROR_MESSAGE.VALIDATION.IS_LENGTH('제목', 0, 100) })
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
        message: ERROR_MESSAGE.VALIDATION.INVALID_DATE_FORMAT('시작 시간', 'YYYY-MM-DD HH:mm:ss'),
    })
    startDate: string;

    @ApiProperty({
        example: '2025-01-01 00:00:00',
        description: '예약 종료 시간 (YYYY-MM-DD HH:mm:ss 형식)',
    })
    @IsDateString()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: ERROR_MESSAGE.VALIDATION.INVALID_DATE_FORMAT('종료 시간', 'YYYY-MM-DD HH:mm:ss'),
    })
    endDate: string;

    @ApiProperty({ required: false })
    @IsBoolean({ message: ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('종일 여부') })
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
    @IsEnum(ReservationStatus, {
        message: ERROR_MESSAGE.VALIDATION.IS_ENUM('예약 상태', Object.values(ReservationStatus)),
    })
    status: ReservationStatus;

    @ApiProperty({ required: false })
    @IsString({ message: ERROR_MESSAGE.VALIDATION.IS_STRING('거절 사유') })
    @IsOptional()
    @Length(0, 100, { message: ERROR_MESSAGE.VALIDATION.IS_LENGTH('거절 사유', 0, 100) })
    rejectReason?: string;
}

// 예약 참가자 변경
export class UpdateReservationParticipantsDto {
    @ApiProperty({ type: [String] })
    @IsArray({ message: ERROR_MESSAGE.VALIDATION.IS_ARRAY('참가자 ID') })
    @IsString({ each: true, message: ERROR_MESSAGE.VALIDATION.INVALID_ARRAY_ITEM_TYPE('참가자 ID', '문자열') })
    participantIds: string[];
}

// 예약 수신참조자 변경
export class UpdateReservationCcReceipientDto {
    @ApiProperty({ type: [String] })
    @IsArray({ message: ERROR_MESSAGE.VALIDATION.IS_ARRAY('수신참조자 ID') })
    @IsString({ each: true, message: ERROR_MESSAGE.VALIDATION.INVALID_ARRAY_ITEM_TYPE('수신참조자 ID', '문자열') })
    ccReceipientIds: string[];
}

// 예약 수정
export class UpdateReservationDto {
    @ApiProperty()
    @IsString({ message: ERROR_MESSAGE.VALIDATION.IS_STRING('자원 ID') })
    @IsOptional()
    resourceId?: string;

    @ApiProperty()
    @IsString({ message: ERROR_MESSAGE.VALIDATION.IS_STRING('제목') })
    @IsOptional()
    @Length(0, 100, { message: ERROR_MESSAGE.VALIDATION.IS_LENGTH('제목', 0, 100) })
    title?: string;

    @ApiProperty({
        example: '2025-01-01 00:00:00',
        description: '예약 시작 시간 (YYYY-MM-DD HH:mm:ss 형식)',
    })
    @IsDateString()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: ERROR_MESSAGE.VALIDATION.INVALID_DATE_FORMAT('시작 시간', 'YYYY-MM-DD HH:mm:ss'),
    })
    @IsOptional()
    startDate?: string;

    @ApiProperty({
        example: '2025-01-01 00:00:00',
        description: '예약 종료 시간 (YYYY-MM-DD HH:mm:ss 형식)',
    })
    @IsDateString()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: ERROR_MESSAGE.VALIDATION.INVALID_DATE_FORMAT('종료 시간', 'YYYY-MM-DD HH:mm:ss'),
    })
    @IsOptional()
    endDate?: string;

    @ApiProperty({ example: false })
    @IsBoolean({ message: ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('종일 여부') })
    @IsOptional()
    isAllDay?: boolean;

    @ApiProperty({ example: false })
    @IsBoolean({ message: ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('시작 전 알림 여부') })
    @IsOptional()
    notifyBeforeStart?: boolean;

    @ApiProperty({ required: false, type: [Number], example: [10, 20] })
    @IsArray({ message: ERROR_MESSAGE.VALIDATION.IS_ARRAY('알림 시간') })
    @IsOptional()
    notifyMinutesBeforeStart?: number[];

    @ApiProperty({ type: [String] })
    @IsArray({ message: ERROR_MESSAGE.VALIDATION.IS_ARRAY('참가자 ID') })
    @IsOptional()
    @IsString({ each: true, message: ERROR_MESSAGE.VALIDATION.INVALID_ARRAY_ITEM_TYPE('참가자 ID', '문자열') })
    participantIds?: string[];
}
