import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class CheckAvailabilityQueryDto {
    @ApiProperty({ description: '자원 ID' })
    @IsUUID()
    resourceId: string;

    @ApiProperty({ description: '예약 시작 시간' })
    @IsString()
    startDate: string;

    @ApiProperty({ description: '예약 종료 시간' })
    @IsString()
    endDate: string;

    @ApiProperty({ description: '예약 ID', required: false })
    @IsUUID()
    @IsOptional()
    reservationId?: string;
}

export class CheckAvailabilityResponseDto {
    @ApiProperty({ description: '예약 가능 여부' })
    isAvailable: boolean;

    // @ApiProperty({ description: '예약 불가능한 경우, 이미 예약된 예약 ID', required: false })
    // conflictingReservationId?: string;
}
