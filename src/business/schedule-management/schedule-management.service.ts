import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Employee } from '@libs/entities/employee.entity';
import { ScheduleCalendarQueryDto } from './dtos/schedule-calendar-query.dto';
import { ScheduleCalendarItemDto, ScheduleCalendarResponseDto } from './dtos/schedule-calendar-response.dto';
import { MyScheduleQueryDto, ScheduleCategoryType } from './dtos/my-schedule-query.dto';
import { MyScheduleResponseDto, MyScheduleItemDto } from './dtos/my-schedule-response.dto';
import { StatisticsItemDto } from './dtos/my-schedule-statistics-response.dto';
import { ResourceScheduleQueryDto } from './dtos/resource-schedule-query.dto';
import {
    ResourceScheduleResponseDto,
    ResourceGroupDto,
    ResourceInfoDto,
    ResourceScheduleItemDto,
} from './dtos/resource-schedule-response.dto';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { Schedule } from '@libs/entities/schedule.entity';
import { ScheduleRelation } from '@libs/entities/schedule-relations.entity';
import { ScheduleParticipant } from '@libs/entities/schedule-participant.entity';
import { Resource } from '@libs/entities/resource.entity';
import { ResourceGroup } from '@libs/entities/resource-group.entity';
import { ScheduleType } from '@libs/enums/schedule-type.enum';
import { ScheduleContextService } from '../../context/schedule/schedule.context.service';

@Injectable()
export class ScheduleManagementService {
    constructor(private readonly scheduleContextService: ScheduleContextService) {}

    async findCalendar(user: Employee, query: ScheduleCalendarQueryDto): Promise<ScheduleCalendarResponseDto> {
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
                case ScheduleCategoryType.SCHEDULE:
                    scheduleRelations = scheduleRelations.filter(
                        (scheduleRelation) => !scheduleRelation.projectId && !scheduleRelation.reservationId,
                    );
                    break;
                case ScheduleCategoryType.PROJECT:
                    scheduleRelations = scheduleRelations.filter((scheduleRelation) => scheduleRelation.projectId);
                    break;
                case ScheduleCategoryType.RESOURCE:
                    scheduleRelations = scheduleRelations.filter((scheduleRelation) => scheduleRelation.reservationId);
                    break;
            }
        }
        scheduleIds = scheduleRelations.map((scheduleRelation) => scheduleRelation.scheduleId);

        const schedules = await this.scheduleContextService.일정들을_조회한다(scheduleIds);
        const reserverMap = await this.scheduleContextService.일정들의_예약자정보를_조회한다(scheduleIds);
        const projectMap = await this.scheduleContextService.일정들의_프로젝트정보를_조회한다(scheduleRelations);
        const reservationMap = await this.scheduleContextService.일정들의_예약정보를_조회한다(scheduleRelations);

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
                // TODO : 알림관련 기능 리팩토링 후 작업
                hasUnreadNotification: false,
            };
            scheduleCalendarItems.push(scheduleCalendarItem);
        });
        const responseData: ScheduleCalendarResponseDto = {
            schedules: scheduleCalendarItems,
        };

        return responseData;
    }

    private async generateCategoryStatistics(
        schedules: Schedule[],
        scheduleRelations: ScheduleRelation[],
        category?: ScheduleCategoryType,
    ): Promise<StatisticsItemDto[]> {
        const { scheduleTypeStats, projectStats, resourceStats } =
            this.scheduleContextService.일정들을_카테고리별로_분류한다(schedules, scheduleRelations);

        const statistics: StatisticsItemDto[] = [];

        if (!category || category === ScheduleCategoryType.ALL) {
            // 전체 카테고리 통계
            statistics.push({
                label: '일정',
                count: Array.from(scheduleTypeStats.values()).reduce((sum, arr) => sum + arr.length, 0),
            });

            statistics.push({
                label: '프로젝트',
                count: projectStats.length,
            });

            statistics.push({
                label: '자원',
                count: Array.from(resourceStats.values()).reduce((sum, arr) => sum + arr.length, 0),
            });
        } else if (category === ScheduleCategoryType.SCHEDULE) {
            // 일정 타입별 세부 통계 (모든 ScheduleType 표시)
            Object.values(ScheduleType).forEach((scheduleType) => {
                const scheduleList = scheduleTypeStats.get(scheduleType) || [];
                statistics.push({
                    label: this.getScheduleTypeLabel(scheduleType),
                    count: scheduleList.length,
                });
            });
        } else if (category === ScheduleCategoryType.PROJECT) {
            // 프로젝트는 단일 통계
            statistics.push({
                label: '프로젝트',
                count: projectStats.length,
            });
        } else if (category === ScheduleCategoryType.RESOURCE) {
            // 자원 타입별 세부 통계 (모든 ResourceType 표시)
            Object.values(ResourceType).forEach((resourceType) => {
                const scheduleList = resourceStats.get(resourceType) || [];
                statistics.push({
                    label: this.getResourceTypeLabel(resourceType),
                    count: scheduleList.length,
                });
            });
        }

        return statistics;
    }

    private getScheduleTypeLabel(type: ScheduleType): string {
        switch (type) {
            case ScheduleType.COMPANY:
                return '회사전체일정';
            case ScheduleType.DEPARTMENT:
                return '부서일정';
            case ScheduleType.PERSONAL:
                return '개인일정';
            default:
                return type;
        }
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

    async findMySchedules(user: Employee, query: MyScheduleQueryDto): Promise<MyScheduleResponseDto> {
        const page = query.page || 1;
        const limit = query.limit || 20;

        // 1. 기본 일정 조회 (오늘 이후의 일정)
        let schedules = await this.scheduleContextService.직원의_다가올_일정을_조회한다(user.employeeId);

        // 2. 역할별 필터링 적용
        schedules = await this.scheduleContextService.일정들을_역할별로_필터링한다(
            schedules,
            user.employeeId,
            query.role,
        );

        // 3. 카테고리별 필터링 적용 (TODO: 구체적인 카테고리 필터링 로직 구현)
        if (query.category && query.category !== ScheduleCategoryType.ALL) {
            const scheduleRelations = await this.scheduleContextService.일정관계정보를_조회한다(
                schedules.map((schedule) => schedule.scheduleId),
            );
            schedules = this.filterByCategory(schedules, scheduleRelations, query.category);
        }

        // 4. 통계 계산 (검색 전 데이터로 계산)
        const scheduleRelationsForStats = await this.scheduleContextService.일정관계정보를_조회한다(
            schedules.map((schedule) => schedule.scheduleId),
        );
        const statistics = await this.generateCategoryStatistics(schedules, scheduleRelationsForStats, query.category);
        const totalCount = schedules.length;

        // 5. 키워드 검색 적용 (통계 계산 후)
        const searchedSchedules = this.scheduleContextService.일정들을_키워드로_필터링한다(schedules, query.keyword);
        const filteredCount = searchedSchedules.length;

        // 6. 페이지네이션 적용
        const { paginatedSchedules, totalPages, hasNext, hasPrevious } =
            this.scheduleContextService.일정들을_페이지네이션_적용한다(searchedSchedules, page, limit);

        // 7. DTO 변환
        const scheduleItems = await this.convertToMyScheduleItems(paginatedSchedules, scheduleRelationsForStats);

        const responseData: MyScheduleResponseDto = {
            statistics,
            totalCount,
            filteredCount,
            currentPage: page,
            pageSize: limit,
            totalPages,
            hasNext,
            hasPrevious,
            schedules: scheduleItems,
        };

        return responseData;
    }

    private filterByCategory(
        schedules: Schedule[],
        scheduleRelations: ScheduleRelation[],
        category: ScheduleCategoryType,
    ): Schedule[] {
        const { scheduleTypeStats, projectStats, resourceStats } =
            this.scheduleContextService.일정들을_카테고리별로_분류한다(schedules, scheduleRelations);

        switch (category) {
            case ScheduleCategoryType.SCHEDULE:
                return Array.from(scheduleTypeStats.values()).flat();
            case ScheduleCategoryType.PROJECT:
                return projectStats;
            case ScheduleCategoryType.RESOURCE:
                return Array.from(resourceStats.values()).flat();
            default:
                return schedules;
        }
    }

    private async convertToMyScheduleItems(
        schedules: Schedule[],
        scheduleRelations: ScheduleRelation[],
    ): Promise<MyScheduleItemDto[]> {
        // 예약자 정보 조회
        const reserverMap = await this.scheduleContextService.일정들의_예약자정보를_조회한다(
            schedules.map((s) => s.scheduleId),
        );

        // 프로젝트 정보 조회
        const projectMap = await this.scheduleContextService.일정들의_프로젝트정보를_조회한다(scheduleRelations);

        // 예약 정보 조회
        const reservationMap = await this.scheduleContextService.일정들의_예약정보를_조회한다(scheduleRelations);

        return schedules.map((schedule) => {
            const reserver = reserverMap.get(schedule.scheduleId);
            const project = projectMap.get(schedule.scheduleId);
            const reservation = reservationMap.get(schedule.scheduleId);

            return {
                scheduleId: schedule.scheduleId,
                title: schedule.title,
                description: schedule.description,
                startDate: schedule.startDate,
                endDate: schedule.endDate,
                scheduleType: this.getScheduleTypeLabel(schedule.scheduleType),
                project: project
                    ? {
                          projectId: project.projectId,
                          projectName: `프로젝트_${project.projectId.slice(-4)}`, // TODO: 실제 프로젝트 이름 조회
                      }
                    : undefined,
                resource: reservation
                    ? {
                          resourceId: reservation.reservationId,
                          resourceName: `자원_${reservation.reservationId.slice(-4)}`, // TODO: 실제 자원 이름 조회
                          resourceType: 'MEETING_ROOM', // TODO: 실제 자원 타입 조회
                      }
                    : undefined,
            };
        });
    }

    async findResourceSchedules(user: Employee, query: ResourceScheduleQueryDto): Promise<ResourceScheduleResponseDto> {
        const { resourceType, date, month } = query;

        // 1. 자원유형별 일정 조회 (숙소는 월별, 그 외는 일별)
        const schedules = await this.scheduleContextService.자원유형별_일정을_조회한다(resourceType, date, month);

        // 2. 자원별로 일정을 그룹핑
        const resourceScheduleMap = await this.scheduleContextService.자원별_일정정보를_맵핑한다(schedules);

        // 3. 자원그룹별 자원정보 조회
        const { resourceGroups, resourceMap } =
            await this.scheduleContextService.자원그룹별_자원정보를_조회한다(resourceType);

        // 4. 예약자 정보 조회
        const reserverMap = await this.scheduleContextService.일정들의_예약자정보를_조회한다(
            schedules.map((s) => s.scheduleId),
        );

        // 5. 자원그룹별 DTO 구성
        const resourceGroupDtos = await this.buildResourceGroupDtos(
            resourceGroups,
            resourceMap,
            resourceScheduleMap,
            reserverMap,
            user.employeeId,
        );

        const responseData: ResourceScheduleResponseDto = {
            type: resourceType,
            resourceGroups: resourceGroupDtos,
        };

        return responseData;
    }

    private async buildResourceGroupDtos(
        resourceGroups: ResourceGroup[],
        resourceMap: Map<string, Resource[]>,
        resourceScheduleMap: Map<string, Schedule[]>,
        reserverMap: Map<string, { participant: ScheduleParticipant; employee: Employee }>,
        currentEmployeeId: string,
    ): Promise<ResourceGroupDto[]> {
        const resourceGroupDtos: ResourceGroupDto[] = [];

        for (const group of resourceGroups) {
            const resources: ResourceInfoDto[] = [];
            const groupResources = resourceMap.get(group.resourceGroupId) || [];

            for (const resource of groupResources) {
                const resourceSchedules = resourceScheduleMap.get(resource.resourceId) || [];

                const scheduleItems: ResourceScheduleItemDto[] = resourceSchedules.map((schedule) => {
                    const reserver = reserverMap.get(schedule.scheduleId);
                    const reserverName = reserver ? reserver.employee.name || '알 수 없음' : '알 수 없음';
                    const isMine = reserver ? reserver.employee.employeeId === currentEmployeeId : false;

                    return {
                        scheduleId: schedule.scheduleId,
                        title: schedule.title,
                        description: schedule.description,
                        startDate: schedule.startDate,
                        endDate: schedule.endDate,
                        reserverName,
                        isMine,
                    };
                });

                resources.push({
                    resourceId: resource.resourceId,
                    resourceName: resource.name,
                    resourceDescription: resource.description,
                    schedules: scheduleItems,
                });
            }

            resourceGroupDtos.push({
                resourceGroupId: group.resourceGroupId,
                resourceGroupName: group.title,
                resourceGroupDescription: group.description,
                order: group.order,
                resources,
            });
        }

        return resourceGroupDtos.sort((a, b) => a.order - b.order);
    }
}
