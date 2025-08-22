import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ScheduleManagementService } from '../schedule-management.service';
import { Employee } from '@libs/entities/employee.entity';
import { User } from '@libs/decorators/user.decorator';
import { ScheduleCalendarQueryDto } from '../dtos/schedule-calendar-query.dto';
import { ScheduleCalendarResponseDto } from '../dtos/schedule-calendar-response.dto';
import { MyScheduleQueryDto } from '../dtos/my-schedule-query.dto';
import { MyScheduleResponseDto } from '../dtos/my-schedule-response.dto';
import { MyScheduleStatisticsQueryDto } from '../dtos/my-schedule-statistics-query.dto';
import { MyScheduleStatisticsResponseDto } from '../dtos/my-schedule-statistics-response.dto';
import { ResourceScheduleQueryDto } from '../dtos/resource-schedule-query.dto';
import { ResourceScheduleResponseDto } from '../dtos/resource-schedule-response.dto';

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
     * 내 일정 통계 조회
     * 내 일정의 검색을 제외한 필터 조건이 적용된 일정 통계를 조회한다.
     * 필터 - 역할 기준 ( 예약자, 참석자 ) / 카테고리 ( 전체, 일정, 프로젝트, 자원 별 )
     *
     */

    @ApiOperation({
        summary: '내 일정 통계 조회',
        description: '내 일정의 검색을 제외한 필터 조건이 적용된 일정 통계를 조회한다.',
    })
    @ApiOkResponse({
        description: '내 일정 통계 조회 성공',
        type: MyScheduleStatisticsResponseDto,
    })
    @Get('my/statistics')
    async findMyScheduleStatistics(
        @User() user: Employee,
        @Query() query: MyScheduleStatisticsQueryDto,
    ): Promise<MyScheduleStatisticsResponseDto> {
        return this.scheduleManagementService.findMyScheduleStatistics(user, query);
    }

    /**
     * 내 일정 조회
     * 조회 조건
     * 1. 현재시간을 기준으로 오늘 날짜 이후의 일정만 조회한다.
     * 2. 필터 - 역할 기준 ( 예약자, 참석자 ) / 카테고리 ( 전체, 일정, 프로젝트, 자원 별 )
     * 3. 제목과 자원명으로 검색할 수 있다.
     */
    @ApiOperation({
        summary: '내 일정 조회',
        description: '로그인한 사용자의 일정을 조회합니다. 역할, 카테고리 필터링과 키워드 검색을 지원합니다.',
    })
    @ApiOkResponse({
        description: '내 일정 조회 성공',
        type: MyScheduleResponseDto,
    })
    @Get('my')
    async findMySchedules(@User() user: Employee, @Query() query: MyScheduleQueryDto): Promise<MyScheduleResponseDto> {
        return this.scheduleManagementService.findMySchedules(user, query);
    }

    /**
     * 자원별 일정 조회
     * 조회 조건
     * 1. 자원별 일정을 조회한다.
     * 2. 조회 조건 - 자원유형별, 날짜별 로 조회할 수 있다.
     * 2-1. 자원유형별로 날짜의 적용이 다르다.
     * 2-2. 숙소는 월별로 검색하고 그 외는 일별로 검색한다.
     * 3. 조회 결과는 자원그룹별로 그룹핑되어서 조회된다.
     */
    @ApiOperation({
        summary: '자원별 일정 조회',
        description:
            '자원 유형별로 일정을 조회합니다. 숙소는 월별, 그 외는 일별로 조회하며, 자원그룹별로 그룹핑됩니다.',
    })
    @ApiOkResponse({
        description: '자원별 일정 조회 성공',
        type: ResourceScheduleResponseDto,
    })
    @Get('resource')
    async findResourceSchedules(
        @User() user: Employee,
        @Query() query: ResourceScheduleQueryDto,
    ): Promise<ResourceScheduleResponseDto> {
        return this.scheduleManagementService.findResourceSchedules(user, query);
    }
}
