import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { Employee } from '@libs/entities/employee.entity';

// 기존 DTO들 import
import { ScheduleCalendarQueryDto } from './dtos/schedule-calendar-query.dto';
import { ScheduleCalendarResponseDto } from './dtos/schedule-calendar-response.dto';
import { MyScheduleQueryDto, ScheduleCategoryType } from './dtos/my-schedule-query.dto';
import { MyScheduleResponseDto } from './dtos/my-schedule-response.dto';
import { ResourceScheduleQueryDto } from './dtos/resource-schedule-query.dto';
import { ResourceScheduleResponseDto } from './dtos/resource-schedule-response.dto';
import { ScheduleDetailQueryDto } from './dtos/schedule-detail-query.dto';
import { ScheduleDetailResponseDto } from './dtos/schedule-detail-response.dto';
import { ScheduleCreateRequestDto } from './dtos/schedule-create-request.dto';
import { ScheduleCreateResponseDto } from './dtos/schedule-create-response.dto';

// 새로운 일정 관리 DTO들 import
import { ScheduleCancelRequestDto } from './dtos/schedule-cancel-request.dto';
import { ScheduleCancelResponseDto } from './dtos/schedule-cancel-response.dto';
import { ScheduleCompleteRequestDto } from './dtos/schedule-complete-request.dto';
import { ScheduleCompleteResponseDto } from './dtos/schedule-complete-response.dto';
import { ScheduleExtendRequestDto } from './dtos/schedule-extend-request.dto';
import { ScheduleExtendResponseDto } from './dtos/schedule-extend-response.dto';
import { ScheduleUpdateRequestDto } from './dtos/schedule-update-request.dto';
import { ScheduleUpdateResponseDto } from './dtos/schedule-update-response.dto';

// Context Services
import { ScheduleQueryContextService } from '../../context/schedule/services/schedule-query.context.service';

import { ReservationContextService } from '../../context/reservation/services/reservation.context.service';
import { ResourceContextService } from '../../context/resource/services/resource.context.service';
import { ProjectContextService } from '../../context/project/project.context.service';
import { VehicleInfoContextService } from '../../context/resource/services/vehicle-info.context.service';
import { MeetingRoomInfoContextService } from '../../context/resource/services/meeting-room-info.context.service';
import { AccommodationInfoContextService } from '../../context/resource/services/accommodation-info.context.service';
import { EquipmentInfoContextService } from '../../context/resource/services/equipment-info.context.service';
import { FileContextService } from '../../context/file/services/file.context.service';

// 새로운 Policy/Authorization Services (컨텍스트로 이동)
import { ScheduleAuthorizationService } from '../../context/schedule/services/schedule-authorization.service';
import { SchedulePolicyService, UpdateScenarios } from '../../context/schedule/services/schedule-policy.service';
import {
    ScheduleStateTransitionService,
    ScheduleUpdateChanges,
    ScheduleUpdateResult,
} from '../../context/schedule/services/schedule-state-transition.service';
import { ScheduleMutationContextService } from '../../context/schedule/services/schedule-mutation.context.service';
import { SchedulePostProcessingService } from '../../context/schedule/services/schedule-post-processing.service';
import { ScheduleAction } from '../../context/schedule/services/schedule-authorization.service';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import {
    ScheduleDetailProjectDto,
    ScheduleDetailParticipantDto,
    ScheduleDetailReservationDto,
} from './dtos/schedule-detail-response.dto';
import { ResourceGroupDto } from './dtos/resource-schedule-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { DataSource } from 'typeorm';
import { Reservation, Schedule } from '@libs/entities';
import { ScheduleType } from '@libs/enums/schedule-type.enum';
import { EmployeeContextService } from '@src/context/employee/employee.context.service';
import { ScheduleNotificationContextService } from '@src/context/notification/services/schedule-notification.context.service';
import { MyScheduleHistoryQueryDto } from './dtos/my-schedule-history-query.dto';
import { MyScheduleHistoryResponseDto } from './dtos/my-schedule-history-response.dto';

@Injectable()
export class ScheduleManagementService {
    private readonly logger = new Logger(ScheduleManagementService.name);

    constructor(
        private readonly dataSource: DataSource,
        private readonly reservationContextService: ReservationContextService,
        private readonly resourceContextService: ResourceContextService,
        private readonly projectContextService: ProjectContextService,
        private readonly vehicleInfoContextService: VehicleInfoContextService,
        private readonly fileContextService: FileContextService,
        private readonly employeeContextService: EmployeeContextService,
        private readonly scheduleNotificationContextService: ScheduleNotificationContextService,

        private readonly scheduleAuthorizationService: ScheduleAuthorizationService,
        private readonly schedulePolicyService: SchedulePolicyService,
        private readonly scheduleQueryContextService: ScheduleQueryContextService,
        private readonly scheduleMutationService: ScheduleMutationContextService,
        private readonly scheduleStateTransitionService: ScheduleStateTransitionService,
        private readonly schedulePostProcessingService: SchedulePostProcessingService,
    ) {}

    async postProcessingSchedules(): Promise<void> {
        return this.schedulePostProcessingService.일정관련_배치_작업을_처리한다();
    }

    // ============================================================================
    // 조회 전용 UC들 (3~5단계 생략, 기존 로직 위임)
    // ============================================================================

    /**
     * 캘린더 조회 (표준 파이프라인 적용)
     */
    async findCalendar(user: Employee, query: ScheduleCalendarQueryDto): Promise<ScheduleCalendarResponseDto> {
        this.logger.log(
            `캘린더 조회 요청 - 사용자: ${user.employeeId}, 날짜: ${query.date}, 직원필터: ${query.employeeIds?.join(',') || '없음'}`,
        );

        // 1. 권한: 조회는 별도 권한 체크 없음 (모든 직원이 캘린더 조회 가능)

        // 2. 그래프 조회: 조건에 맞는 일정 ID들 조회
        const scheduleIds = await this.scheduleQueryContextService.캘린더용_일정을_조회한다(
            query.date,
            query.category,
            query.mySchedule ? user.employeeId : undefined,
        );

        if (scheduleIds.length === 0) {
            return { schedules: [] };
        }

        // 3. 벌크 데이터 조회 (한 번의 호출로 모든 관련 데이터 조회)
        const scheduleDataList = await this.scheduleQueryContextService.복수_일정과_관계정보들을_조회한다(scheduleIds, {
            withReservation: true,
            withResource: true,
            withParticipants: true, // 예약자 정보 필요
        });

        // employeeIds 필터링 적용 (해당 직원이 참여하는 일정만)
        let filteredScheduleDataList = scheduleDataList;
        if (query.employeeIds && query.employeeIds.length > 0) {
            filteredScheduleDataList = scheduleDataList.filter(({ participants }) => {
                if (!participants || participants.length === 0) return false;

                // 해당 일정에 지정된 직원 중 하나라도 참여하는지 확인
                return participants.some(
                    (participant) =>
                        participant.employee?.employeeId &&
                        query.employeeIds!.includes(participant.employee.employeeId),
                );
            });
        }

        const scheduleCalendarItems = filteredScheduleDataList.map(
            ({ schedule, reservation, resource, participants }) => {
                // 예약자 찾기 (RESERVER 타입의 참가자)
                const reserver = participants?.find((p) => p.type === ParticipantsType.RESERVER);

                return {
                    scheduleId: schedule.scheduleId,
                    scheduleTitle: schedule.title,
                    startDate: schedule.startDate,
                    endDate: schedule.endDate,
                    reserverName: reserver?.employee?.name || '',
                    project: undefined, // TODO: 프로젝트 구현 후 추가
                    reservation:
                        reservation && resource
                            ? {
                                  reservationId: reservation.reservationId,
                                  resourceName: resource.name,
                                  resourceType: resource.type,
                              }
                            : undefined,
                    // TODO : 알림관련 기능 리팩토링 후 작업
                    hasUnreadNotification: false,
                };
            },
        );

        return {
            schedules: scheduleCalendarItems,
        };
    }

    /**
     * 내 일정 조회 (표준 파이프라인 적용)
     */
    async findMySchedules(user: Employee, query: MyScheduleQueryDto): Promise<MyScheduleResponseDto> {
        this.logger.log(`내 일정 조회 요청 - 사용자: ${user.employeeId}`);

        const page = query.page || 1;
        const limit = query.limit || 20;

        const { scheduleIds, statistics, totalCount, filteredCount, totalPages, hasNext, hasPrevious } =
            await this.scheduleQueryContextService.내_일정을_조회한다(user.employeeId, query);

        // 3. 벌크 데이터 조회 (한 번의 호출로 모든 관련 데이터 조회)
        const scheduleDataList = await this.scheduleQueryContextService.복수_일정과_관계정보들을_조회한다(scheduleIds, {
            withProject: true,
            withReservation: true,
            withResource: true,
        });

        const scheduleCalendarItems = scheduleDataList.map(({ schedule, project, reservation, resource }) => {
            return {
                scheduleId: schedule.scheduleId,
                title: schedule.title,
                description: schedule.description,
                startDate: schedule.startDate,
                endDate: schedule.endDate,
                scheduleType: this.scheduleQueryContextService.일정타입_라벨을_가져온다(schedule.scheduleType),
                scheduleDepartment: schedule.scheduleDepartment,
                project: project
                    ? {
                          projectId: project.projectId,
                          projectName: project.projectName, // TODO: 실제 프로젝트 이름 조회
                      }
                    : undefined,
                resource: reservation
                    ? {
                          resourceId: reservation.reservationId,
                          resourceName: resource.name,
                          resourceType: resource.type,
                      }
                    : undefined,
            };
        });

        return {
            statistics,
            totalCount,
            filteredCount,
            currentPage: page,
            pageSize: limit,
            totalPages,
            hasNext,
            hasPrevious,
            schedules: scheduleCalendarItems,
        };
    }

    /**
     * 내 일정 내역 조회 (표준 파이프라인 적용)
     */
    async findMyScheduleHistory(
        user: Employee,
        query: MyScheduleHistoryQueryDto,
    ): Promise<MyScheduleHistoryResponseDto> {
        this.logger.log(`내 일정 내역 조회 요청 - 사용자: ${user.employeeId}`);

        const page = query.page || 1;
        const limit = query.limit || 20;

        const { scheduleIds, filteredCount, totalPages, hasNext, hasPrevious } =
            await this.scheduleQueryContextService.내_일정_내역을_조회한다(user.employeeId, query);
        // 3. 벌크 데이터 조회 (한 번의 호출로 모든 관련 데이터 조회)
        const scheduleDataList = await this.scheduleQueryContextService.복수_일정과_관계정보들을_조회한다(scheduleIds, {
            withProject: true,
            withReservation: true,
            withResource: true,
            withParticipants: true,
        });
        const scheduleCalendarItems = scheduleDataList.map(
            ({ schedule, project, reservation, resource, participants }) => {
                return {
                    scheduleId: schedule.scheduleId,
                    title: schedule.title,
                    description: schedule.description,
                    startDate: schedule.startDate,
                    endDate: schedule.endDate,
                    scheduleType: this.scheduleQueryContextService.일정타입_라벨을_가져온다(schedule.scheduleType),
                    scheduleDepartment: schedule.scheduleDepartment,
                    notifyMinutesBeforeStart: schedule.notifyMinutesBeforeStart,
                    participants: participants?.map((participant) => ({
                        employeeId: participant.employeeId,
                    })),
                    project: project
                        ? {
                              projectId: project.projectId,
                              projectName: project.projectName, // TODO: 실제 프로젝트 이름 조회
                          }
                        : undefined,
                    resource: reservation
                        ? {
                              resourceId: reservation.reservationId,
                              resourceName: resource.name,
                              resourceType: resource.type,
                          }
                        : undefined,
                };
            },
        );
        return {
            currentPage: page,
            pageSize: limit,
            totalPages,
            hasNext,
            hasPrevious,
            schedules: scheduleCalendarItems,
        };
    }

    /**
     * 자원별 일정 조회 (표준 파이프라인 적용 - 최적화 버전)
     */
    async findResourceSchedules(user: Employee, query: ResourceScheduleQueryDto): Promise<ResourceScheduleResponseDto> {
        this.logger.log(`자원별 일정 조회 요청 - 사용자: ${user.employeeId}, 자원타입: ${query.resourceType}`);

        // 1. 권한: 자원별 일정 조회는 모든 직원이 가능

        // 2. 그래프 조회: 단일 벌크 조회로 모든 관련 데이터 획득
        const { scheduleDataList, resourceGroups, resourceMap } =
            await this.scheduleQueryContextService.자원별_일정_조회_데이터를_조회한다(
                query.resourceType,
                query.date,
                query.month,
            );

        // 3~5. 정책/실행/후처리: 조회이므로 생략

        // 6. 응답 DTO 변환 (DTO factory 메서드 활용)
        const resourceGroupDtos = ResourceGroupDto.fromResourceGroupsAndData(
            resourceGroups,
            resourceMap,
            scheduleDataList,
            user.employeeId,
        );

        return {
            type: query.resourceType,
            resourceGroups: resourceGroupDtos,
        };
    }

    /**
     * 일정 상세 조회 (표준 파이프라인 적용)
     */
    async findScheduleDetail(user: Employee, query: ScheduleDetailQueryDto): Promise<ScheduleDetailResponseDto> {
        this.logger.log(`일정 상세 조회 요청 - 사용자: ${user.employeeId}, 일정ID: ${query.scheduleId}`);

        // 2. 그래프 조회: 컨텍스트에서 데이터 조회
        const { scheduleId, includeProject, includeReservation } = query;

        const scheduleData = await this.scheduleQueryContextService.일정과_관계정보들을_조회한다(scheduleId, {
            withProject: includeProject,
            withReservation: includeReservation,
            withResource: includeReservation,
            withParticipants: true,
        });
        if (scheduleData === null) {
            throw new NotFoundException(`일정을 찾을 수 없습니다. ID: ${scheduleId}`);
        }
        const { schedule, project, reservation, resource, participants } = scheduleData;
        const reserver = participants?.find((p) => p.type === ParticipantsType.RESERVER);
        const regularParticipants = participants?.filter((p) => p.type !== ParticipantsType.RESERVER) || [];

        // 3~5. 정책/실행/후처리: 조회이므로 생략

        // 6. 응답 DTO 변환 (각 DTO의 factory 메서드 활용)
        const reserverDto = reserver ? ScheduleDetailParticipantDto.fromParticipantWithEmployee(reserver) : undefined;

        const participantsDto = ScheduleDetailParticipantDto.fromParticipantsArray(regularParticipants);

        const projectDto = project ? ScheduleDetailProjectDto.fromProject(project) : undefined;

        // 예약 정보 DTO 변환 (자원 타입별 상세 정보 포함)
        let reservationDto: ScheduleDetailReservationDto | undefined = undefined;
        if (reservation && resource) {
            const resourceImages = await this.fileContextService.자원_파일을_조회한다(resource.resourceId);
            resource.images = resourceImages.images.map((image) => image.filePath);
            const typeInfo = await this.resourceContextService.자원의_타입별_상세정보를_조회한다(resource);
            if (resource.type === ResourceType.VEHICLE) {
                const vehicleInfo = await this.vehicleInfoContextService.차량정보만_조회한다(resource.resourceId);
                const { parkingLocationImages, odometerImages, indoorImages } =
                    await this.fileContextService.차량정보_파일을_조회한다(vehicleInfo.vehicleInfoId);
                typeInfo.parkingLocationImages = parkingLocationImages;
                typeInfo.odometerImages = odometerImages;
                typeInfo.indoorImages = indoorImages;
            }
            reservationDto = ScheduleDetailReservationDto.fromReservationAndResource(reservation, resource, typeInfo);
        }

        return {
            scheduleId: schedule.scheduleId,
            title: schedule.title,
            description: schedule.description,
            startDate: schedule.startDate,
            endDate: schedule.endDate,
            scheduleType: schedule.scheduleType,
            scheduleDepartment: schedule.scheduleDepartment,
            location: schedule.location,
            status: schedule.status,
            notifyBeforeStart: schedule.notifyBeforeStart,
            notifyMinutesBeforeStart: schedule.notifyMinutesBeforeStart,
            isMine: reserver?.employeeId === user.employeeId,
            reserver: reserverDto,
            participants: participantsDto,
            project: projectDto,
            reservation: reservationDto,
        };
    }

    // ============================================================================
    // 생성/수정 UC들 (표준 파이프라인 적용)
    // ============================================================================

    /**
     * 일정 생성 (표준 파이프라인 적용, 레거시 로직 완전 보존)
     */
    async createSchedule(
        user: Employee,
        createScheduleDto: ScheduleCreateRequestDto,
    ): Promise<ScheduleCreateResponseDto> {
        this.logger.log(`일정 생성 요청 - 사용자: ${user.employeeId}, 제목: ${createScheduleDto.title}`);

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

        // 1. 권한: 요청자/역할 확인
        const authResult = await this.scheduleAuthorizationService.일정_생성_권한을_확인한다(user);
        this.scheduleAuthorizationService.권한_체크_실패시_예외를_던진다(authResult);

        // 2. 그래프 조회: 컨텍스트에서 사전 검증 및 정보 조회 (레거시 로직 유지)
        let projectId: string | null = null;
        let resourceInfo = null;

        // 프로젝트 존재 여부 확인 (레거시 로직 유지)
        if (projectSelection) {
            projectId = projectSelection.projectId;
            const projectExists = await this.projectContextService.프로젝트_존재여부를_확인한다(projectId);
            if (!projectExists) {
                throw new BadRequestException('존재하지 않는 프로젝트입니다.');
            }
        }

        // 자원 존재 여부 확인 (레거시 로직 유지)
        if (resourceSelection) {
            resourceInfo = await this.resourceContextService.자원정보를_조회한다(resourceSelection.resourceId);
            if (!resourceInfo) {
                throw new BadRequestException('존재하지 않는 자원입니다.');
            }
        }

        // 3. 정책 판단: 기본 정책 체크 (자원 충돌은 State Transition에서 처리)
        const createRequest = {
            title,
            description,
            location,
            scheduleType,
            participants,
            datesSelection,
            resourceSelection,
            projectSelection,
        };

        const policyResult = await this.schedulePolicyService.다중_일정_생성이_가능한지_확인한다(createRequest);
        this.schedulePolicyService.정책_체크_실패시_예외를_던진다(policyResult);

        // 4. 실행/전이: 다중 일정 생성 (레거시 로직 완전 유지)
        // 자원예약일 경우 각 날짜별로 예약 가능 여부 확인 후 실패/성공 분리
        const createdSchedules = [];
        const failedSchedules = [];

        for (const dateRange of datesSelection) {
            // 각 날짜별로 통합 트랜잭션 실행
            // const result = await this.scheduleMutationService.일정생성_예약생성_트랜잭션을_실행한다(user, {
            //     title,
            //     description,
            //     location,
            //     scheduleType,
            //     notifyBeforeStart,
            //     notifyMinutesBeforeStart: notificationMinutes || [],
            //     participants,
            //     dateRange,
            //     resourceSelection,
            //     projectSelection,
            // });

            const data = {
                title,
                description,
                location,
                scheduleType,
                notifyBeforeStart,
                notifyMinutesBeforeStart: notificationMinutes || [],
                participants,
                dateRange,
                resourceSelection,
                projectSelection,
            };

            const result = {
                success: true,
                schedule: null,
                reason: null,
            };

            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {
                let reservationId: string | null = null;

                // 1) 자원 예약 생성 (있는 경우)
                if (data.resourceSelection) {
                    // 예약 가능 여부 확인
                    const isAvailable = await this.reservationContextService.자원예약이_가능한지_확인한다(
                        data.resourceSelection.resourceId,
                        new Date(data.dateRange.startDate),
                        new Date(data.dateRange.endDate),
                    );

                    if (!isAvailable) {
                        throw new BadRequestException('선택한 시간대에 자원이 이미 예약되어 있습니다.');
                    }

                    // 예약 생성 (QueryRunner 전달)
                    const reservationData = {
                        title: data.title,
                        description: data.description || '',
                        resourceId: data.resourceSelection.resourceId,
                        resourceType: data.resourceSelection.resourceType,
                        status:
                            data.resourceSelection.resourceType === ResourceType.ACCOMMODATION
                                ? ReservationStatus.PENDING
                                : ReservationStatus.CONFIRMED,
                        startDate: new Date(data.dateRange.startDate),
                        endDate: new Date(data.dateRange.endDate),
                    };

                    const createdReservation = await this.reservationContextService.자원예약을_생성한다(
                        reservationData,
                        queryRunner, // 🔥 QueryRunner 전달
                    );
                    reservationId = createdReservation.reservationId;
                }

                // 2) 일정 생성 (QueryRunner 전달)
                const scheduleData = {
                    title: data.title,
                    description: data.location
                        ? `${data.description || ''}\n장소: ${data.location}`.trim()
                        : data.description,
                    startDate: new Date(data.dateRange.startDate),
                    endDate: new Date(data.dateRange.endDate),
                    scheduleType: data.scheduleType,
                    notifyBeforeStart: data.notifyBeforeStart || false,
                    notifyMinutesBeforeStart: data.notifyMinutesBeforeStart || [],
                    scheduleDepartment: data.scheduleType === ScheduleType.DEPARTMENT ? user.department : null,
                };

                const createdSchedule = await this.scheduleMutationService.일정을_생성한다(
                    scheduleData,
                    queryRunner, // 🔥 QueryRunner 전달
                );

                // 3) 참가자 생성
                await this.scheduleMutationService.일정_참가자를_추가한다(
                    createdSchedule.scheduleId!,
                    user.employeeId,
                    'RESERVER',
                    queryRunner,
                );

                for (const participant of data.participants) {
                    if (participant.employeeId !== user.employeeId) {
                        await this.scheduleMutationService.일정_참가자를_추가한다(
                            createdSchedule.scheduleId!,
                            participant.employeeId,
                            'PARTICIPANT',
                            queryRunner,
                        );
                    }
                }

                // 4) 일정관계정보 생성
                const relationData = {
                    scheduleId: createdSchedule.scheduleId!,
                    projectId: data.projectSelection?.projectId || null,
                    reservationId: reservationId,
                };

                await this.scheduleMutationService.일정관계정보를_생성한다(relationData, queryRunner);

                // 트랜잭션 커밋
                await queryRunner.commitTransaction();

                result.success = true;
                result.schedule = createdSchedule;
            } catch (error) {
                // 트랜잭션 롤백
                await queryRunner.rollbackTransaction();

                result.success = false;
                result.reason = `일정 생성 실패: ${error.message}`;
            } finally {
                // 쿼리러너 해제
                await queryRunner.release();
            }

            if (result.success) {
                createdSchedules.push(result.schedule!);
            } else {
                failedSchedules.push({
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    reason: result.reason!,
                });
            }
        }

        if (createdSchedules.length > 0) {
            // 5. 후처리: 여러 날짜에 일정이 생성되어도 일정 정보는 동일하기 때문에 첫 번째 일정의 정보를 사용
            const { schedule, reservation, resource } =
                await this.scheduleQueryContextService.일정과_관계정보들을_조회한다(createdSchedules[0].scheduleId!, {
                    withReservation: true,
                    withResource: true,
                });
            const systemAdmins = await this.employeeContextService.시스템관리자_목록을_조회한다();
            await this.scheduleNotificationContextService.일정_생성_알림을_전송한다(
                { schedule, reservation, resource },
                [user.employeeId, ...participants.map((participant) => participant.employeeId)],
                systemAdmins.map((admin) => admin.employeeId),
            );
        }

        // 6. 응답 DTO 변환
        const createdSchedulesDtos = createdSchedules.map((schedule) => ({
            scheduleId: schedule.scheduleId,
            title: schedule.title,
            startDate: schedule.startDate.toISOString(),
            endDate: schedule.endDate.toISOString(),
            scheduleType: schedule.scheduleType,
        }));

        return {
            createdSchedules: createdSchedulesDtos,
            failedSchedules,
        };
    }

    /**
     * 일정 취소 (삭제)
     */
    async cancelSchedule(user: Employee, scheduleId: string, cancelDto?: ScheduleCancelRequestDto): Promise<boolean> {
        this.logger.log(`일정 취소 요청 - 사용자: ${user.employeeId}, 일정: ${scheduleId}`);

        // 1. 권한: 요청자/역할 확인
        const authResult = await this.scheduleAuthorizationService.일정_권한을_확인한다(
            user,
            scheduleId,
            ScheduleAction.CANCEL,
        );
        this.scheduleAuthorizationService.권한_체크_실패시_예외를_던진다(authResult);

        // 2. 그래프 조회: 컨텍스트에서 벌크 로딩 (N+1 금지)
        const { schedule, reservation, resource, participants } =
            await this.scheduleQueryContextService.일정과_관계정보들을_조회한다(scheduleId, {
                withReservation: true,
                withResource: true,
                withParticipants: true,
            });

        // 3. 정책 판단: 가능/불가(사유 코드 포함)
        const policyResult = await this.schedulePolicyService.일정_취소가_가능한지_확인한다(schedule, reservation);
        this.schedulePolicyService.정책_체크_실패시_예외를_던진다(policyResult);

        // 4. 실행/전이: 상태 변경/생성/삭제 (트랜잭션)
        const cancelResult = await this.scheduleStateTransitionService.일정을_취소한다(schedule, reservation);

        // 5. 후처리: 알림/감사/도메인이벤트
        await this.scheduleNotificationContextService.일정_취소_알림을_전송한다({ schedule, reservation, resource }, [
            user.employeeId,
            ...participants.map((participant) => participant.employeeId),
        ]);

        // 6. 응답 DTO 변환
        return cancelResult;
    }

    /**
     * 일정 완료 (표준 파이프라인 적용)
     */
    async completeSchedule(
        user: Employee,
        scheduleId: string,
        completeDto?: ScheduleCompleteRequestDto,
    ): Promise<boolean> {
        this.logger.log(`일정 완료 요청 - 사용자: ${user.employeeId}, 일정: ${scheduleId}`);

        // 1. 권한: 요청자/역할 확인
        const authResult = await this.scheduleAuthorizationService.일정_권한을_확인한다(
            user,
            scheduleId,
            ScheduleAction.COMPLETE,
        );
        this.scheduleAuthorizationService.권한_체크_실패시_예외를_던진다(authResult);

        // 2. 그래프 조회: 컨텍스트에서 벌크 로딩 (N+1 금지)
        const { schedule, reservation } = await this.scheduleQueryContextService.일정과_관계정보들을_조회한다(
            scheduleId,
            {
                withReservation: true,
            },
        );

        // 3. 정책 판단: 가능/불가(사유 코드 포함)
        const policyResult = await this.schedulePolicyService.일정_완료가_가능한지_확인한다(schedule, reservation);
        this.schedulePolicyService.정책_체크_실패시_예외를_던진다(policyResult);

        // 4. 실행/전이: 상태 변경/생성/삭제 (트랜잭션)
        const completeResult = await this.scheduleStateTransitionService.일정을_완료한다(
            schedule,
            reservation,
            // completeDto.completionNotes,
        );

        // 6. 응답 DTO 변환
        return completeResult;
    }

    /**
     * 일정 30분 연장 가능 여부 확인 (표준 파이프라인 적용)
     */
    async checkScheduleExtendable(user: Employee, scheduleId: string): Promise<boolean> {
        this.logger.log(`일정 연장 가능 여부 확인 요청 - 사용자: ${user.employeeId}, 일정: ${scheduleId}`);

        try {
            // 1. 권한: 요청자/역할 확인
            const authResult = await this.scheduleAuthorizationService.일정_권한을_확인한다(
                user,
                scheduleId,
                ScheduleAction.EXTEND,
            );
            this.scheduleAuthorizationService.권한_체크_실패시_예외를_던진다(authResult);

            // 2. 그래프 조회: 컨텍스트에서 벌크 로딩 (N+1 금지)
            const { schedule, reservation } = await this.scheduleQueryContextService.일정과_관계정보들을_조회한다(
                scheduleId,
                {
                    withReservation: true,
                },
            );

            // 3. 정책 판단: 30분 연장 가능 여부 확인
            const policyResult = await this.schedulePolicyService.일정_30분_연장이_가능한지_확인한다(
                schedule,
                reservation,
            );
            console.log(policyResult);
            return policyResult.isAllowed;
        } catch (error) {
            // 에러 발생 시 연장 불가능으로 처리
            this.logger.warn(`일정 연장 가능 여부 확인 실패: ${error.message}`);
            return false;
        }
    }

    /**
     * 일정 30분 연장 (표준 파이프라인 적용)
     */
    async extendSchedule30Min(user: Employee, scheduleId: string): Promise<ScheduleExtendResponseDto> {
        this.logger.log(`일정 30분 연장 요청 - 사용자: ${user.employeeId}, 일정: ${scheduleId}`);

        // 1. 권한: 요청자/역할 확인
        const authResult = await this.scheduleAuthorizationService.일정_권한을_확인한다(
            user,
            scheduleId,
            ScheduleAction.EXTEND,
        );
        this.scheduleAuthorizationService.권한_체크_실패시_예외를_던진다(authResult);

        // 2. 그래프 조회: 컨텍스트에서 벌크 로딩 (N+1 금지)
        const { schedule, reservation } = await this.scheduleQueryContextService.일정과_관계정보들을_조회한다(
            scheduleId,
            {
                withReservation: true,
            },
        );

        // 3. 정책 판단: 30분 연장 가능 여부 확인
        const policyResult = await this.schedulePolicyService.일정_30분_연장이_가능한지_확인한다(schedule, reservation);
        this.schedulePolicyService.정책_체크_실패시_예외를_던진다(policyResult);

        // 4. 실행/전이: 30분 연장된 새로운 종료시간 계산
        const newEndDate = new Date(schedule.endDate);
        newEndDate.setMinutes(newEndDate.getMinutes() + 30);

        const extendResult = await this.scheduleStateTransitionService.일정을_연장한다(
            schedule,
            reservation,
            newEndDate,
            '30분 자동 연장',
        );

        // 5. 후처리: 알림/감사/도메인이벤트
        // await this.schedulePostProcessingService.일정_연장_후처리(user, extendResult);

        // 6. 응답 DTO 변환
        return {
            scheduleId: extendResult.schedule.scheduleId,
            title: extendResult.schedule.title,
            originalEndDate: extendResult.originalEndDate,
            newEndDate: extendResult.newEndDate,
            reason: '30분 자동 연장',
            reservation: extendResult.reservation
                ? {
                      reservationId: extendResult.reservation.reservationId,
                      endDate: extendResult.reservation.endDate,
                  }
                : undefined,
        };
    }

    /**
     * 일정 수정 (표준 파이프라인 적용) - 세 가지 수정 시나리오 지원
     */
    async updateSchedule(user: Employee, scheduleId: string, updateDto: ScheduleUpdateRequestDto): Promise<boolean> {
        this.logger.log(`일정 수정 요청 - 사용자: ${user.employeeId}, 일정: ${scheduleId}`);

        // 0. 수정 시나리오 분석 및 검증
        const updateScenarios = this.schedulePolicyService.수정_시나리오를_분석한다(updateDto);
        this.schedulePolicyService.수정요청을_기본검증한다(updateDto, updateScenarios);

        // 1. 권한: 요청자/역할 확인
        const authResult = await this.scheduleAuthorizationService.일정_권한을_확인한다(
            user,
            scheduleId,
            ScheduleAction.UPDATE,
        );
        this.scheduleAuthorizationService.권한_체크_실패시_예외를_던진다(authResult);

        // 2. 그래프 조회: 컨텍스트에서 벌크 로딩 (N+1 금지)
        const { schedule, reservation } = await this.scheduleQueryContextService.일정과_관계정보들을_조회한다(
            scheduleId,
            {
                withReservation: true,
            },
        );

        // 3. 정책 판단: 시나리오별 정책 검증
        if (updateScenarios.isDateUpdate) {
            const datePolicy = await this.schedulePolicyService.일정_날짜수정이_가능한지_확인한다(
                schedule,
                reservation,
                {
                    newStartDate: updateDto.date?.startDate ? new Date(updateDto.date.startDate) : undefined,
                    newEndDate: updateDto.date?.endDate ? new Date(updateDto.date.endDate) : undefined,
                },
            );
            this.schedulePolicyService.정책_체크_실패시_예외를_던진다(datePolicy);
        }

        if (updateScenarios.isInfoUpdate) {
            const infoPolicy = await this.schedulePolicyService.일정_정보수정이_가능한지_확인한다(
                schedule,
                updateDto.info,
            );
            this.schedulePolicyService.정책_체크_실패시_예외를_던진다(infoPolicy);
        }

        if (updateScenarios.isResourceUpdate) {
            const resourcePolicy = await this.schedulePolicyService.일정_자원수정이_가능한지_확인한다(
                schedule,
                reservation,
                updateDto.resource.resourceId,
            );
            this.schedulePolicyService.정책_체크_실패시_예외를_던진다(resourcePolicy);
        }

        // 4. 실행/전이: 시나리오별 상태 변경 (트랜잭션)
        const updateResult = await this.scheduleStateTransitionService.일정을_시나리오별로_수정한다(
            schedule,
            reservation,
            {
                dateChanges: updateScenarios.isDateUpdate
                    ? {
                          startDate: updateDto.date?.startDate ? new Date(updateDto.date.startDate) : undefined,
                          endDate: updateDto.date?.endDate ? new Date(updateDto.date.endDate) : undefined,
                      }
                    : undefined,

                infoChanges: updateScenarios.isInfoUpdate
                    ? {
                          title: updateDto.info?.title,
                          description: updateDto.info?.description,
                          notifyBeforeStart: updateDto.info?.notifyBeforeStart,
                          notifyMinutesBeforeStart: updateDto.info?.notifyMinutesBeforeStart,
                          location: updateDto.info?.location,
                          scheduleType: updateDto.info?.scheduleType,
                          projectId: updateDto.info?.projectId,
                          participants: updateDto.info?.participants,
                      }
                    : undefined,

                resourceChanges: updateScenarios.isResourceUpdate
                    ? {
                          newResourceId: updateDto.resource.resourceId,
                      }
                    : undefined,
            },
        );

        // 5. 후처리: 시나리오별 후처리
        const { resource, participants } = await this.scheduleQueryContextService.일정과_관계정보들을_조회한다(
            scheduleId,
            {
                withReservation: true,
                withResource: true,
                withParticipants: true,
            },
        );
        const employeeIds =
            updateScenarios.isInfoUpdate && updateResult.participantChanges
                ? Array.from(
                      new Set([
                          ...updateResult.participantChanges.previousParticipants.map(
                              (participant) => participant.employeeId,
                          ),
                          ...updateResult.participantChanges.newParticipants.map(
                              (participant) => participant.employeeId,
                          ),
                      ]),
                  )
                : participants.map((participant) => participant.employeeId);

        await this.scheduleNotificationContextService.일정_수정_알림을_전송한다(
            updateScenarios,
            {
                schedule,
                reservation,
                resource,
            },
            employeeIds,
        );

        // 6. 응답 DTO 변환
        return true;
    }
}
