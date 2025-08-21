import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class ScheduleCalendarQueryDto {
    @ApiProperty({
        description: '조회할 날짜 (YYYY-MM 형식)',
        example: '2024-01',
        required: true,
    })
    @IsString()
    date: string;

    @ApiProperty({
        description: '카테고리 필터 (전체, 일정, 프로젝트, 자원)',
        example: '전체',
        required: false,
    })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiProperty({
        description: '내 일정만 조회 여부',
        example: false,
        required: false,
        type: Boolean,
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return Boolean(value);
    })
    @IsBoolean()
    mySchedule?: boolean;
}
