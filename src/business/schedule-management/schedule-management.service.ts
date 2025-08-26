import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Employee } from '@libs/entities/employee.entity';
import { DataSource } from 'typeorm';
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
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { Schedule } from '@libs/entities/schedule.entity';
import { ScheduleRelation } from '@libs/entities/schedule-relations.entity';
import { ScheduleParticipant } from '@libs/entities/schedule-participant.entity';
import { Resource } from '@libs/entities/resource.entity';
import { ResourceGroup } from '@libs/entities/resource-group.entity';
import { ScheduleType } from '@libs/enums/schedule-type.enum';
import { ScheduleContextService } from '../../context/schedule/schedule.context.service';
import { ResourceContextService } from '../../context/resource/services/resource.context.service';
import { ReservationContextService } from '../../context/reservation/services/reservation.context.service';
import { NotificationContextService } from '../../context/notification/services/v2-notification.context.service';

import { ScheduleDetailQueryDto } from './dtos/schedule-detail-query.dto';
import {
    ScheduleDetailResponseDto,
    ScheduleDetailProjectDto,
    ScheduleDetailReservationDto,
    ScheduleDetailParticipantDto,
    ScheduleDetailResourceDto,
} from './dtos/schedule-detail-response.dto';
import { ScheduleCreateRequestDto } from './dtos/schedule-create-request.dto';
import { ScheduleCreateResponseDto } from './dtos/schedule-create-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { VehicleInfoContextService } from '../../context/resource/services/vehicle-info.context.service';
import { MeetingRoomInfoContextService } from '../../context/resource/services/meeting-room-info.context.service';
import { AccommodationInfoContextService } from '../../context/resource/services/accommodation-info.context.service';
import { EquipmentInfoContextService } from '../../context/resource/services/equipment-info.context.service';
import { FileContextService } from '../../context/file/services/file.context.service';
import { ProjectContextService } from '../../context/project/project.context.service';
import { NotificationType } from '@libs/enums/notification-type.enum';

@Injectable()
export class ScheduleManagementService {
    constructor(
        private readonly scheduleContextService: ScheduleContextService,
        private readonly resourceContextService: ResourceContextService,
        private readonly reservationContextService: ReservationContextService,
        private readonly notificationContextService: NotificationContextService,
        private readonly vehicleInfoContextService: VehicleInfoContextService,
        private readonly meetingRoomInfoContextService: MeetingRoomInfoContextService,
        private readonly accommodationInfoContextService: AccommodationInfoContextService,
        private readonly equipmentInfoContextService: EquipmentInfoContextService,
        private readonly fileContextService: FileContextService,
        private readonly projectContextService: ProjectContextService,
        private readonly dataSource: DataSource,
    ) {}

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

    /**
     * 카테고리별 통계 생성 (데이터 가공만, 조회 안함)
     */
    private generateCategoryStatistics(
        scheduleTypeStats: Map<string, Schedule[]>,
        projectStats: Schedule[],
        resourceStats: Map<string, Schedule[]>,
        category?: ScheduleCategoryType,
    ): StatisticsItemDto[] {
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
                    label: this.scheduleContextService.일정타입_라벨을_가져온다(scheduleType),
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
                    label: this.resourceContextService.자원타입_라벨을_가져온다(resourceType),
                    count: scheduleList.length,
                });
            });
        }

        return statistics;
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

        // 3. 카테고리별 필터링 적용
        if (query.category && query.category !== ScheduleCategoryType.ALL) {
            const scheduleRelations = await this.scheduleContextService.일정관계정보를_조회한다(
                schedules.map((schedule) => schedule.scheduleId),
            );
            // 카테고리별 분류 데이터 조회
            const { scheduleTypeStats, projectStats, resourceStats } =
                this.scheduleContextService.일정들을_카테고리별로_분류한다(schedules, scheduleRelations);

            schedules = this.filterByCategory(scheduleTypeStats, projectStats, resourceStats, query.category);
        }

        // 4. 통계 계산 (검색 전 데이터로 계산)
        const scheduleRelationsForStats = await this.scheduleContextService.일정관계정보를_조회한다(
            schedules.map((schedule) => schedule.scheduleId),
        );
        // 카테고리별 분류 데이터 조회
        const { scheduleTypeStats, projectStats, resourceStats } =
            this.scheduleContextService.일정들을_카테고리별로_분류한다(schedules, scheduleRelationsForStats);

        const statistics = this.generateCategoryStatistics(
            scheduleTypeStats,
            projectStats,
            resourceStats,
            query.category,
        );
        const totalCount = schedules.length;

        // 5. 키워드 검색 적용 (통계 계산 후)
        const searchedSchedules = this.scheduleContextService.일정들을_키워드로_필터링한다(schedules, query.keyword);
        const filteredCount = searchedSchedules.length;

        // 6. 페이지네이션 적용
        const { paginatedSchedules, totalPages, hasNext, hasPrevious } =
            this.scheduleContextService.일정들을_페이지네이션_적용한다(searchedSchedules, page, limit);

        // 7. DTO 변환
        // 예약자 정보 조회
        const reserverMap = await this.scheduleContextService.일정들의_예약자정보를_조회한다(
            paginatedSchedules.map((s) => s.scheduleId),
        );

        // 프로젝트 정보 조회
        const projectMap =
            await this.scheduleContextService.일정들의_프로젝트정보를_조회한다(scheduleRelationsForStats);

        // 예약 정보 조회
        const reservationMap =
            await this.scheduleContextService.일정들의_예약정보를_조회한다(scheduleRelationsForStats);

        const scheduleItems = this.convertToMyScheduleItems(
            paginatedSchedules,
            reserverMap,
            projectMap,
            reservationMap,
        );

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

    /**
     * 카테고리별 필터링 (데이터 가공만, 조회 안함)
     */
    private filterByCategory(
        scheduleTypeStats: Map<string, Schedule[]>,
        projectStats: Schedule[],
        resourceStats: Map<string, Schedule[]>,
        category: ScheduleCategoryType,
    ): Schedule[] {
        switch (category) {
            case ScheduleCategoryType.SCHEDULE:
                return Array.from(scheduleTypeStats.values()).flat();
            case ScheduleCategoryType.PROJECT:
                return projectStats;
            case ScheduleCategoryType.RESOURCE:
                return Array.from(resourceStats.values()).flat();
            default:
                return [];
        }
    }

    /**
     * 일정 DTO 변환 (데이터 가공만, 조회 안함)
     */
    private convertToMyScheduleItems(
        schedules: Schedule[],
        reserverMap: Map<string, { participant: ScheduleParticipant; employee: Employee }>,
        projectMap: Map<string, any>,
        reservationMap: Map<string, any>,
    ): MyScheduleItemDto[] {
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
                scheduleType: this.scheduleContextService.일정타입_라벨을_가져온다(schedule.scheduleType),
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
        const resourceGroupDtos = this.buildResourceGroupDtos(
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

    /**
     * 자원 그룹 DTO 구성 (데이터 가공만, 조회 안함)
     */
    private buildResourceGroupDtos(
        resourceGroups: ResourceGroup[],
        resourceMap: Map<string, Resource[]>,
        resourceScheduleMap: Map<string, Schedule[]>,
        reserverMap: Map<string, { participant: ScheduleParticipant; employee: Employee }>,
        currentEmployeeId: string,
    ): ResourceGroupDto[] {
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
                    isAvailable: resource.isAvailable,
                    unavailableReason: resource.unavailableReason,
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

    async findScheduleDetail(user: Employee, query: ScheduleDetailQueryDto): Promise<ScheduleDetailResponseDto> {
        const { scheduleId, includeProject, includeReservation } = query;

        // 1. 일정 기본 정보 조회
        const schedules = await this.scheduleContextService.일정들을_조회한다([scheduleId]);
        if (schedules.length === 0) {
            throw new NotFoundException(`일정을 찾을 수 없습니다. ID: ${scheduleId}`);
        }
        const schedule = schedules[0];

        // 2. 참가자 정보 조회 (예약자와 일반 참가자 분리)
        const { reserver, participants } =
            await this.scheduleContextService.일정의_참가자들을_분리하여_조회한다(scheduleId);

        // 3. 일정 관계 정보 조회 (프로젝트, 예약 정보 확인용)
        const scheduleRelations = await this.scheduleContextService.일정관계정보를_조회한다([scheduleId]);
        const scheduleRelation = scheduleRelations.length > 0 ? scheduleRelations[0] : null;

        // 4. 옵션에 따른 추가 정보 조회
        let project: ScheduleDetailProjectDto | undefined;
        let reservation: ScheduleDetailReservationDto | undefined;

        if (includeProject && scheduleRelation?.projectId) {
            // TODO: 실제 프로젝트 서비스 구현 후 실제 데이터 조회로 변경
            project = this.buildProjectDetailDto(scheduleRelation.projectId);
        }

        if (includeReservation && scheduleRelation?.reservationId) {
            // 예약 정보 조회
            const reservationMap = await this.scheduleContextService.일정들의_예약정보를_조회한다([
                { scheduleId: '', reservationId: scheduleRelation.reservationId, projectId: null } as ScheduleRelation,
            ]);

            const reservationData = Array.from(reservationMap.values())[0];
            if (!reservationData) {
                throw new NotFoundException(`예약 정보를 찾을 수 없습니다. ID: ${scheduleRelation.reservationId}`);
            }

            // 자원 타입별 상세 정보 조회
            let typeInfo: any = null;
            if (reservationData.resource.type === 'VEHICLE') {
                const vehicleInfo = await this.vehicleInfoContextService.차량정보만_조회한다(
                    reservationData.resourceId,
                );
                if (vehicleInfo) {
                    const vehicleFiles = await this.fileContextService.차량정보_파일을_조회한다(
                        vehicleInfo.vehicleInfoId,
                    );
                    typeInfo = this.buildVehicleTypeInfo(vehicleInfo, vehicleFiles);
                }
            } else if (reservationData.resource.type === 'MEETING_ROOM') {
                typeInfo = await this.meetingRoomInfoContextService.회의실정보만_조회한다(reservationData.resourceId);
            } else if (reservationData.resource.type === 'ACCOMMODATION') {
                typeInfo = await this.accommodationInfoContextService.숙소정보만_조회한다(reservationData.resourceId);
            } else if (reservationData.resource.type === 'EQUIPMENT') {
                typeInfo = await this.equipmentInfoContextService.장비정보만_조회한다(reservationData.resourceId);
            }

            reservation = this.buildReservationDetailDto(reservationData, typeInfo);
        }

        // 5. DTO 구성
        const response: ScheduleDetailResponseDto = {
            scheduleId: schedule.scheduleId,
            title: schedule.title,
            description: schedule.description,
            startDate: schedule.startDate,
            endDate: schedule.endDate,
            scheduleType: schedule.scheduleType,
            notifyBeforeStart: schedule.notifyBeforeStart,
            notifyMinutesBeforeStart: schedule.notifyMinutesBeforeStart,
            reserver,
            participants,
            project,
            reservation,
        };

        return response;
    }

    async createSchedule(
        user: Employee,
        createScheduleDto: ScheduleCreateRequestDto,
    ): Promise<ScheduleCreateResponseDto> {
        const {
            datesSelection,
            title,
            description,
            location,
            notifyBeforeStart,
            notificationMinutes,
            scheduleType,
            participants,
            projectSelection,
            resourceSelection,
        } = createScheduleDto;

        // 1. 사전 검증 단계 - 프로젝트나 자원이 있을 경우 미리 검증
        let projectId: string | null = null;
        let resourceInfo = null;

        // 프로젝트 존재 여부 확인
        if (projectSelection) {
            projectId = projectSelection.projectId;
            const projectExists = await this.projectContextService.프로젝트_존재여부를_확인한다(projectId);
            if (!projectExists) {
                throw new BadRequestException('존재하지 않는 프로젝트입니다.');
            }
        }

        // 자원 존재 여부 확인
        if (resourceSelection) {
            resourceInfo = await this.resourceContextService.자원정보를_조회한다(resourceSelection.resourceId);
            if (!resourceInfo) {
                throw new BadRequestException('존재하지 않는 자원입니다.');
            }
        }

        // 2. 날짜별 트랜잭션 처리
        const createdSchedules = [];
        const failedSchedules = [];

        for (const dateRange of datesSelection) {
            // 자원예약일 경우 해당 시간대 예약 가능 여부 확인
            if (resourceSelection) {
                const isAvailable = await this.reservationContextService.자원예약이_가능한지_확인한다(
                    resourceSelection.resourceId,
                    new Date(dateRange.startDate),
                    new Date(dateRange.endDate),
                );
                if (!isAvailable) {
                    failedSchedules.push({
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate,
                        reason: '선택한 시간대에 자원이 이미 예약되어 있습니다.',
                    });
                    continue;
                }
            }

            // 트랜잭션 시작 - 개별 일정에 대한 모든 작업
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {
                // 1) 일정 생성
                const scheduleData = {
                    title,
                    description: location ? `${description || ''}\n장소: ${location}`.trim() : description,
                    startDate: new Date(dateRange.startDate),
                    endDate: new Date(dateRange.endDate),
                    scheduleType,
                    notifyBeforeStart,
                    notifyMinutesBeforeStart: notificationMinutes || [],
                };

                const createdSchedule = await this.scheduleContextService.일정을_생성한다(scheduleData, queryRunner);
                // 2) 참가자 생성
                // 예약자(요청자) 추가
                await this.scheduleContextService.일정_참가자를_추가한다(
                    createdSchedule.scheduleId!,
                    user.employeeId,
                    'RESERVER',
                    queryRunner,
                );

                // 다른 참석자들 추가
                for (const participant of participants) {
                    if (participant.employeeId !== user.employeeId) {
                        await this.scheduleContextService.일정_참가자를_추가한다(
                            createdSchedule.scheduleId!,
                            participant.employeeId,
                            'PARTICIPANT',
                            queryRunner,
                        );
                    }
                }
                // 3) 자원예약 생성 (있는 경우)
                let reservationId: string | null = null;
                if (resourceSelection && resourceInfo) {
                    const reservationData = {
                        title: title,
                        description: description,
                        resourceId: resourceSelection.resourceId,
                        resourceType: resourceSelection.resourceType,
                        status:
                            resourceSelection.resourceType === ResourceType.ACCOMMODATION
                                ? ReservationStatus.PENDING
                                : ReservationStatus.CONFIRMED,
                        startDate: new Date(dateRange.startDate),
                        endDate: new Date(dateRange.endDate),
                    };

                    const createdReservation = await this.reservationContextService.자원예약을_생성한다(
                        reservationData,
                        queryRunner,
                    );
                    reservationId = createdReservation.reservationId!;
                }

                // 4) 일정관계정보 생성
                const relationData = {
                    scheduleId: createdSchedule.scheduleId!,
                    projectId: projectId,
                    reservationId: reservationId,
                };

                await this.scheduleContextService.일정관계정보를_생성한다(relationData, queryRunner);

                // 5) 알림 생성

                // 트랜잭션 커밋
                await queryRunner.commitTransaction();
                createdSchedules.push(createdSchedule);
            } catch (error) {
                // 트랜잭션 롤백
                await queryRunner.rollbackTransaction();

                failedSchedules.push({
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    reason: `일정 생성 실패: ${error.message}`,
                });
            } finally {
                // 쿼리러너 해제
                await queryRunner.release();
            }
        }

        // 응답 DTO 구성
        const createdSchedulesDtos = createdSchedules.map((schedule) => ({
            scheduleId: schedule.scheduleId,
            title: schedule.title,
            startDate: schedule.startDate,
            endDate: schedule.endDate,
            scheduleType: schedule.scheduleType,
        }));

        return {
            createdSchedules: createdSchedulesDtos,
            failedSchedules: failedSchedules,
        };
    }

    /**
     * 프로젝트 상세 DTO 구성 (데이터 가공만, 조회 안함)
     */
    private buildProjectDetailDto(projectId: string): ScheduleDetailProjectDto {
        // TODO: 실제 프로젝트 서비스 구현 후 실제 데이터 조회로 변경
        return {
            projectId,
            projectName: `프로젝트_${projectId.slice(-4)}`, // 임시 데이터
        };
    }

    /**
     * 예약 상세 DTO 구성 (데이터 가공만, 조회 안함)
     */
    private buildReservationDetailDto(reservationData: any, typeInfo: any): ScheduleDetailReservationDto {
        const resourceInfo = {
            resourceId: reservationData.resource.resourceId,
            name: reservationData.resource.name,
            type: reservationData.resource.type,
            description: reservationData.resource.description,
            location: reservationData.resource.location,
            typeInfo,
        };

        return {
            reservationId: reservationData.reservationId,
            title: reservationData.title,
            description: reservationData.description,
            status: reservationData.status,
            resource: resourceInfo,
        };
    }

    /**
     * 차량 타입 정보 구성 (데이터 가공만, 조회 안함)
     */
    private buildVehicleTypeInfo(vehicleInfo: any, vehicleFiles: any): any {
        return {
            ...vehicleInfo,
            parkingLocationImages: vehicleFiles.parkingLocationImages.map((file: any) => file.filePath),
            odometerImages: vehicleFiles.odometerImages.map((file: any) => file.filePath),
            indoorImages: vehicleFiles.indoorImages.map((file: any) => file.filePath),
        };
    }
}
