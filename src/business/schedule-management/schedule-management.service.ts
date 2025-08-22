import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Employee } from '@libs/entities/employee.entity';
import { ScheduleCalendarQueryDto } from './dtos/schedule-calendar-query.dto';
import { ScheduleCalendarItemDto, ScheduleCalendarResponseDto } from './dtos/schedule-calendar-response.dto';
import { MyScheduleQueryDto, ScheduleCategoryType } from './dtos/my-schedule-query.dto';
import { MyScheduleResponseDto } from './dtos/my-schedule-response.dto';
import {
    MyScheduleStatisticsQueryDto,
    ScheduleCategoryType as StatsCategoryType,
} from './dtos/my-schedule-statistics-query.dto';
import { MyScheduleStatisticsResponseDto, StatisticsItemDto } from './dtos/my-schedule-statistics-response.dto';
import { ResourceScheduleQueryDto } from './dtos/resource-schedule-query.dto';
import { ResourceScheduleResponseDto } from './dtos/resource-schedule-response.dto';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ScheduleContextService } from '../../context/schedule/schedule.context.service';
import { ScheduleType } from '@libs/enums/schedule-type.enum';

@Injectable()
export class ScheduleManagementService {
    constructor(private readonly scheduleContextService: ScheduleContextService) {}

    async findCalendar(user: Employee, query: ScheduleCalendarQueryDto): Promise<ScheduleCalendarResponseDto> {
        // TODO: 일정 캘린더 조회 로직 구현
        // 1. 한달을 기준으로 조회 (query.date)
        // 2. 카테고리 필터 적용 (query.category)
        // 3. 내 일정만 조회 옵션 (query.mySchedule)

        const { date, category, mySchedule } = query;
        const monthlySchedules = await this.scheduleContextService.월별_일정을_조회한다(date);
        let scheduleIds = monthlySchedules.map((schedule) => schedule.scheduleId);
        if (mySchedule) {
            const mySchedules = await this.scheduleContextService.직원의_일정을_조회한다(user.employeeId, scheduleIds);
            scheduleIds = mySchedules.map((mySchedule) => mySchedule.scheduleId);
        }
        let scheduleRelations = await this.scheduleContextService.일정관계정보를_조회한다(scheduleIds);
        if (category) {
            switch (category) {
                case ScheduleCategoryType.PROJECT:
                    scheduleRelations = scheduleRelations.filter((scheduleRelation) => scheduleRelation.projectId);
                    break;
                case ScheduleCategoryType.RESOURCE:
                    scheduleRelations = scheduleRelations.filter((scheduleRelation) => scheduleRelation.reservationId);
                    break;
                default:
                    scheduleRelations = scheduleRelations.filter(
                        (scheduleRelation) => !scheduleRelation.projectId && !scheduleRelation.reservationId,
                    );
                    break;
            }
        }
        scheduleIds = scheduleRelations.map((scheduleRelation) => scheduleRelation.scheduleId);
        const schedules = await this.scheduleContextService.일정들을_조회한다(scheduleIds);
        const reserverMap = await this.scheduleContextService.일정들의_예약자정보를_조회한다(scheduleIds);
        const projectMap = await this.scheduleContextService.일정들의_프로젝트정보를_조회한다(scheduleRelations);
        const reservationMap = await this.scheduleContextService.일정들의_예약정보를_조회한다(scheduleRelations);

        // 일정관계정보를 조회할 때 scheduleId배열을 만들어서 In()을 통해 조회한다,
        // 예약자정보도 scheduleId 배열을 통해 조회한다.
        // domainScheduleRelationService 일정관계정보를 최종 조회 후 관계쩡보들을 조회하여 최종응답형태로 만든다.
        const scheduleCalendarItems: ScheduleCalendarItemDto[] = [];
        schedules.forEach((schedule) => {
            const scheduleId = schedule.scheduleId;
            const reserver = reserverMap.get(scheduleId);
            const project = projectMap.get(scheduleId);
            const reservation = reservationMap.get(scheduleId);
            const scheduleCalendarItem: ScheduleCalendarItemDto = {
                scheduleId,
                scheduleTitle: schedule.title,
                startDate: schedule.startDate,
                endDate: schedule.endDate,
                reserverName: reserver?.employee.name || '',
                project: project ? { projectId: project.projectId } : undefined,
                reservation: reservation
                    ? {
                          reservationId: reservation.reservationId,
                          resourceName: reservation.resource.name,
                          resourceType: reservation.resource.type,
                      }
                    : undefined,
                hasUnreadNotification: false,
            };
            scheduleCalendarItems.push(scheduleCalendarItem);
        });
        const responseData: ScheduleCalendarResponseDto = {
            schedules: scheduleCalendarItems,
        };

        return responseData;
    }

    async findMySchedules(user: Employee, query: MyScheduleQueryDto): Promise<MyScheduleResponseDto> {
        // TODO: 내 일정 조회 로직 구현
        // 1. 현재시간 기준 오늘 이후의 일정만 조회
        // 2. 역할 필터 적용 (query.role)
        // 3. 카테고리 필터 적용 (query.category)
        // 4. 키워드 검색 적용 (query.keyword)
        // 5. 페이지네이션 적용 (query.page, query.limit)

        const page = query.page || 1;
        const limit = query.limit || 20;
        const totalCount = 0; // TODO: 실제 개수 조회
        const totalPages = Math.ceil(totalCount / limit);

        const responseData: MyScheduleResponseDto = {
            schedules: [], // TODO: 실제 일정 데이터 조회
        };

        return responseData;
    }

    async findMyScheduleStatistics(
        user: Employee,
        query: MyScheduleStatisticsQueryDto,
    ): Promise<MyScheduleStatisticsResponseDto> {
        // TODO: 실제 데이터베이스에서 통계 데이터 조회

        const totalSchedules = 24; // TODO: 실제 전체 건수 조회
        const statistics: StatisticsItemDto[] = [];

        // 필터 조건에 따라 동적으로 통계 항목 생성
        await this.generateDynamicStatistics(query, statistics, totalSchedules);

        const responseData: MyScheduleStatisticsResponseDto = {
            label: '통계',
            totalCount: totalSchedules,
            statistics,
        };

        return responseData;
    }

    private async generateDynamicStatistics(
        query: MyScheduleStatisticsQueryDto,
        statistics: StatisticsItemDto[],
        totalCount: number,
    ): Promise<void> {
        // 역할별 통계 (role 필터가 적용되지 않은 경우)
        if (!query.role) {
            const roleStats = await this.generateRoleStatistics(query, totalCount);
            if (roleStats) statistics.push(roleStats);
        }

        // 카테고리별 통계 (category 필터가 적용되지 않은 경우)
        if (!query.category || query.category === StatsCategoryType.ALL) {
            const categoryStats = await this.generateCategoryStatistics(query, totalCount);
            if (categoryStats) statistics.push(categoryStats);
        }

        // 추가 통계 (월별, 시간대별 등)
        const timeStats = await this.generateTimeStatistics(query, totalCount);
        if (timeStats) statistics.push(timeStats);
    }

    private async generateRoleStatistics(
        query: MyScheduleStatisticsQueryDto,
        totalCount: number,
    ): Promise<StatisticsItemDto | null> {
        // TODO: 실제 데이터베이스에서 역할별 건수 조회
        const mockData = [
            { type: ParticipantsType.RESERVER, count: 15 },
            { type: ParticipantsType.PARTICIPANT, count: 8 },
            { type: ParticipantsType.CC_RECEIPIENT, count: 1 },
        ];

        const details: StatisticsItemDto[] = mockData.map((item) => ({
            key: item.type,
            label: this.getParticipantTypeLabel(item.type),
            count: item.count,
            percentage: totalCount > 0 ? Math.round((item.count / totalCount) * 100 * 10) / 10 : 0,
        }));

        return {
            label: '역할별',
            count: totalCount,
        };
    }

    private async generateCategoryStatistics(
        query: MyScheduleStatisticsQueryDto,
        totalCount: number,
    ): Promise<StatisticsItemDto | null> {
        // TODO: 실제 데이터베이스에서 카테고리별 건수 조회
        const mockData = [
            { type: StatsCategoryType.SCHEDULE, count: 10 },
            { type: StatsCategoryType.PROJECT, count: 8 },
            { type: StatsCategoryType.RESOURCE, count: 6 },
        ];

        const details: StatisticsItemDto[] = mockData.map((item) => ({
            key: item.type,
            label: this.getCategoryTypeLabel(item.type),
            count: item.count,
            percentage: totalCount > 0 ? Math.round((item.count / totalCount) * 100 * 10) / 10 : 0,
        }));

        return {
            label: '카테고리별',
            count: totalCount,
        };
    }

    private async generateTimeStatistics(
        query: MyScheduleStatisticsQueryDto,
        totalCount: number,
    ): Promise<StatisticsItemDto | null> {
        // TODO: 실제 데이터베이스에서 시간대별 건수 조회
        const mockData = [
            { timeRange: '오전 (09:00-12:00)', count: 12 },
            { timeRange: '오후 (13:00-18:00)', count: 10 },
            { timeRange: '저녁 (18:00-21:00)', count: 2 },
        ];

        const details: StatisticsItemDto[] = mockData.map((item) => ({
            key: item.timeRange,
            label: item.timeRange,
            count: item.count,
            percentage: totalCount > 0 ? Math.round((item.count / totalCount) * 100 * 10) / 10 : 0,
        }));

        return {
            label: '시간대별',
            count: totalCount,
        };
    }

    private getParticipantTypeLabel(type: ParticipantsType): string {
        switch (type) {
            case ParticipantsType.RESERVER:
                return '예약자';
            case ParticipantsType.PARTICIPANT:
                return '참석자';
            case ParticipantsType.CC_RECEIPIENT:
                return '수신참조자';
            default:
                return type;
        }
    }

    private getCategoryTypeLabel(type: StatsCategoryType): string {
        switch (type) {
            case StatsCategoryType.SCHEDULE:
                return '일정';
            case StatsCategoryType.PROJECT:
                return '프로젝트';
            case StatsCategoryType.RESOURCE:
                return '자원';
            case StatsCategoryType.ALL:
                return '전체';
            default:
                return type;
        }
    }

    async findResourceSchedules(user: Employee, query: ResourceScheduleQueryDto): Promise<ResourceScheduleResponseDto> {
        // TODO: 실제 데이터베이스에서 자원별 일정 데이터 조회

        // 자원 유형에 따른 날짜 검색 방식 결정
        const isMonthlySearch = query.resourceType === ResourceType.ACCOMMODATION;
        const queryDate = isMonthlySearch ? query.month || '' : query.date || '';
        const queryType = isMonthlySearch ? 'monthly' : 'daily';

        // TODO: 실제 자원그룹별 일정 데이터 조회
        const responseData: ResourceScheduleResponseDto = {
            type: query.resourceType,
            resourceGroups: [], // TODO: 실제 자원그룹별 데이터
        };

        return responseData;
    }

    private getResourceTypeLabel(type: ResourceType): string {
        switch (type) {
            case ResourceType.MEETING_ROOM:
                return '회의실';
            case ResourceType.VEHICLE:
                return '차량';
            case ResourceType.ACCOMMODATION:
                return '숙소';
            case ResourceType.EQUIPMENT:
                return '장비';
            default:
                return type;
        }
    }
}
