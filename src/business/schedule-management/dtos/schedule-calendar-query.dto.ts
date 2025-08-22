import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ScheduleCategoryType } from './my-schedule-query.dto';

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
        enum: ScheduleCategoryType,
        example: ScheduleCategoryType.ALL,
        required: false,
    })
    @IsOptional()
    @IsEnum(ScheduleCategoryType)
    category?: ScheduleCategoryType;

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
