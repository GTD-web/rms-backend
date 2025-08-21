import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ScheduleManagementService } from '../schedule-management.service';

@ApiTags('v2 일정 목록 조회')
@Controller('v2/schedule')
@ApiBearerAuth()
export class ReservationVehicleController {
    constructor(private readonly scheduleManagementService: ScheduleManagementService) {}

    /**
     * 일정 캘린더 조회
     * 조회 조건
     * 1. 한달을 기준으로 조회한다 (쿼리로 연.월 을 받는다)
     * 2. 카테고리 필터가 존재한다. (전체, 일정, 프로젝트, 자원 별)
     * 3. 로그인한 유저를 기준으로 한 내 일정만 조회할 수 있다.
     * 4.
     *
     *
     */
    // @Get('calendar')
    // async findCalendar(@Query() query: PaginationQueryDto): Promise<PaginationData<ScheduleResponseDto>> {
    //     return this.scheduleManagementService.findCalendar(query);
    // }

    /**
     * 일별 일정 목록 조회
     *
     */

    /**
     * 내 일정
     * 조회 조건
     * 1. 현재시간을 기준으로 오늘 날짜 이후의 일정만 조회한다.
     * 2. 필터는 다른 조회 API들과 동일하게 간다. (내일정은 기본이다.)
     * 3. 제목과 자원명으로 검색할 수 있다.
     */
}
