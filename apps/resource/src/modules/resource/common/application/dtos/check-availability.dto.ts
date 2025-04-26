import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsUUID } from 'class-validator';

export class CheckAvailabilityQueryDto {
    @ApiProperty({ description: '예약 시작 시간' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: '예약 종료 시간' })
    @IsDate()
    endDate: Date;
}

export class CheckAvailabilityResponseDto {
    @ApiProperty({ description: '예약 가능 여부' })
    isAvailable: boolean;

    // @ApiProperty({ description: '예약 불가능한 경우, 이미 예약된 예약 ID', required: false })
    // conflictingReservationId?: string;
} 