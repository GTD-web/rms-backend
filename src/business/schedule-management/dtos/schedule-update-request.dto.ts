import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsBoolean, IsArray, IsInt, Min, MaxLength } from 'class-validator';

/**
 * 일정 수정 요청 DTO
 */
export class ScheduleUpdateRequestDto {
    @ApiProperty({
        description: '일정 제목',
        example: '수정된 주간 팀 회의',
        required: false,
        maxLength: 100,
    })
    @IsOptional()
    @IsString()
    @MaxLength(100, { message: '제목은 100자를 초과할 수 없습니다.' })
    title?: string;

    @ApiProperty({
        description: '일정 설명',
        example: '수정된 회의 설명입니다.',
        required: false,
        maxLength: 1000,
    })
    @IsOptional()
    @IsString()
    @MaxLength(1000, { message: '설명은 1000자를 초과할 수 없습니다.' })
    description?: string;

    @ApiProperty({
        description: '시작 날짜 및 시간',
        example: '2025-08-25T10:00:00Z',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiProperty({
        description: '종료 날짜 및 시간',
        example: '2025-08-25T11:00:00Z',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    endDate?: string;

    @ApiProperty({
        description: '시작 전 알림 여부',
        example: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    notifyBeforeStart?: boolean;

    @ApiProperty({
        description: '시작 전 알림 시간 (분)',
        example: [10, 30],
        required: false,
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    @Min(1, { each: true })
    notifyMinutesBeforeStart?: number[];

    @ApiProperty({
        description: '수정 사유',
        example: '시간 변경 요청으로 인한 수정입니다.',
        required: false,
        maxLength: 500,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500, { message: '수정 사유는 500자를 초과할 수 없습니다.' })
    reason?: string;
}
