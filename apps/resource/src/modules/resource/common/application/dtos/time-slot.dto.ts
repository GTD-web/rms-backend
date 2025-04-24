import { ApiProperty } from '@nestjs/swagger';

/**
 * 시간 슬롯을 표시하는 DTO
 */
export class TimeSlotDto {
    @ApiProperty({
        description: '시작 시간 (ISO 문자열)',
        example: '2025-01-01T09:00:00',
    })
    startTime: string;

    @ApiProperty({
        description: '종료 시간 (ISO 문자열)',
        example: '2025-01-01T10:00:00',
    })
    endTime: string;
}
