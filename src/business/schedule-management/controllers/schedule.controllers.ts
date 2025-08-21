import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ScheduleManagementService } from '../schedule-management.service';
import { Employee } from '@libs/entities/employee.entity';
import { User } from '@libs/decorators/user.decorator';
import { ScheduleCalendarQueryDto } from '../dtos/schedule-calendar-query.dto';
import { ScheduleCalendarResponseDto } from '../dtos/schedule-calendar-response.dto';

@ApiTags('v2 일정')
@Controller('v2/schedule')
@ApiBearerAuth()
export class ScheduleController {
    constructor(private readonly scheduleManagementService: ScheduleManagementService) {}

    /**
     * 일정 캘린더 조회
     * 조회 조건
     * 1. 한달을 기준으로 조회한다 (쿼리로 연.월 을 받는다)
     * 2. 카테고리 필터가 존재한다. (전체, 일정, 프로젝트, 자원 별)
     * 3. 로그인한 유저를 기준으로 한 내 일정만 조회할 수 있다.
     */
    @ApiOperation({
        summary: '일정 캘린더 조회',
        description: '월별 일정 캘린더를 조회합니다. 카테고리 필터 및 내 일정만 조회 옵션을 지원합니다.',
    })
    @ApiOkResponse({
        description: '일정 캘린더 조회 성공',
        type: ScheduleCalendarResponseDto,
    })
    @Get('calendar')
    async findCalendar(
        @User() user: Employee,
        @Query() query: ScheduleCalendarQueryDto,
    ): Promise<ScheduleCalendarResponseDto> {
        return this.scheduleManagementService.findCalendar(user, query);
    }

    /**
     * 내 일정
     * 조회 조건
     * 1. 현재시간을 기준으로 오늘 날짜 이후의 일정만 조회한다.
     * 2. 필터 - 역할 기준 ( 예약자, 참석자 ) /
     * 3. 제목과 자원명으로 검색할 수 있다.
     */

    /**
     * 자원별 일정
     * 조회 조건
     * 1. 자원별 일정을 조회한다.
     * 3. 제목과 자원명으로 검색할 수 있다.
     */
}
