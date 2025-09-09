import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainScheduleService } from '@src/domain/schedule/schedule.service';
import { DomainScheduleParticipantService } from '@src/domain/schedule-participant/schedule-participant.service';
import { DomainScheduleRelationService } from '@src/domain/schedule-relation/schedule-relation.service';

import { Between, In, Like, MoreThanOrEqual, Not, IsNull } from 'typeorm';
import { Schedule } from '@libs/entities/schedule.entity';
import { ScheduleParticipant } from '@libs/entities/schedule-participant.entity';
import { ScheduleRelation } from '@libs/entities/schedule-relations.entity';
import { Employee } from '@libs/entities/employee.entity';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { DomainProjectService } from '@src/domain/project/project.service';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { Reservation } from '@libs/entities/reservation.entity';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ScheduleType } from '@libs/enums/schedule-type.enum';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { Resource } from '@libs/entities/resource.entity';
import { ResourceGroup } from '@libs/entities/resource-group.entity';
import { DateUtil } from '@libs/utils/date.util';
import { ApiProperty } from '@nestjs/swagger';
import { ScheduleCategoryType } from '@src/business/schedule-management/dtos/my-schedule-query.dto';

export interface ScheduleParticipantsWithEmployee {
    participantId: string;
    scheduleId: string;
    employeeId: string;
    type: ParticipantsType;
    employee: Employee;
}

export interface ProjectInfo {
    projectId: string;
    projectName: string;
}

@Injectable()
export class ScheduleQueryContextService {
    private readonly logger = new Logger(ScheduleQueryContextService.name);

    constructor(
        private readonly domainScheduleService: DomainScheduleService,
        private readonly domainScheduleParticipantService: DomainScheduleParticipantService,
        private readonly domainScheduleRelationService: DomainScheduleRelationService,
        private readonly domainEmployeeService: DomainEmployeeService,
        private readonly domainProjectService: DomainProjectService,
        private readonly domainReservationService: DomainReservationService,
        private readonly domainResourceService: DomainResourceService,
        private readonly domainResourceGroupService: DomainResourceGroupService,
    ) {}

    async 다가오는_일정을_조회한다(): Promise<Schedule[]> {
        const now = DateUtil.now().toDate();
        const endOfDay = DateUtil.now().addMinutes(90).toDate();

        // 1. 기본 조건으로 후보 일정들을 먼저 조회
        const candidateSchedules = await this.domainScheduleService.findAll({
            where: {
                notifyBeforeStart: true,
                startDate: Between(now, endOfDay), // 미래 일정만
            },
        });

        // 2. JavaScript에서 정확한 알림 시간 조건 필터링
        const currentMinute = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes(),
            0,
            0,
        );

        return candidateSchedules.filter((schedule) => {
            // notifyMinutesBeforeStart 배열의 각 분 수만큼 뺀 시간들 계산
            const notifyTimes = schedule.notifyMinutesBeforeStart.map((minutes) => {
                const notifyTime = new Date(schedule.startDate);
                notifyTime.setMinutes(notifyTime.getMinutes() - minutes);
                // 분 단위로 반올림
                return {
                    minutes,
                    notifyTime: new Date(
                        notifyTime.getFullYear(),
                        notifyTime.getMonth(),
                        notifyTime.getDate(),
                        notifyTime.getHours(),
                        notifyTime.getMinutes(),
                        0,
                        0,
                    ),
                };
            });

            // 현재 시간이 알림 시간들 중 하나와 일치하는지 확인
            const isMatch = notifyTimes.some(
                (notifyTime) => notifyTime.notifyTime.getTime() === currentMinute.getTime(),
            );
            if (isMatch) {
                schedule.notifyMinutesBeforeStart = [
                    notifyTimes.find((notifyTime) => notifyTime.notifyTime.getTime() === currentMinute.getTime())
                        ?.minutes,
                ];
            }
            return isMatch;
        });
    }

    async 일정과_관계정보들을_조회한다(
        scheduleId: string,
        option?: {
            withProject?: boolean;
            withReservation?: boolean;
            withResource?: boolean;
            withParticipants?: boolean;
        },
    ): Promise<{
        schedule: Schedule;
        project?: ProjectInfo;
        reservation?: Reservation;
        resource?: Resource;
        participants?: ScheduleParticipantsWithEmployee[];
    }> {
        const schedule = await this.domainScheduleService.findOne({
            where: { scheduleId },
        });
        if (!schedule) {
            throw new NotFoundException('일정을 찾을 수 없습니다.');
        }
        const scheduleRelation = await this.domainScheduleRelationService.findByScheduleId(scheduleId);
        let project = null,
            reservation = null,
            resource = null;
        let participants = [];

        if (option?.withProject && scheduleRelation.projectId) {
            const { projects, notFound } = await this.domainProjectService.getProjectsByIdsGet([
                scheduleRelation.projectId,
            ]);
            project = projects[0] || null;
        }
        if (option?.withReservation && scheduleRelation.reservationId) {
            reservation = await this.domainReservationService.findByReservationId(scheduleRelation.reservationId);
            reservation.status =
                reservation.startDate < new Date() &&
                reservation.endDate > new Date() &&
                reservation.status === ReservationStatus.CONFIRMED
                    ? ReservationStatus.USING
                    : reservation.status;
            resource = option?.withResource
                ? reservation
                    ? await this.domainResourceService.findByResourceId(reservation.resourceId)
                    : null
                : null;
        }

        if (option?.withParticipants) {
            const scheduleParticipants = await this.domainScheduleParticipantService.findByScheduleId(scheduleId);
            const employeeIds = [...new Set(scheduleParticipants.map((participant) => participant.employeeId))];
            const employees = await this.domainEmployeeService.findByEmployeeIds(employeeIds);
            participants = scheduleParticipants.map((participant) => ({
                participantId: participant.participantId,
                scheduleId: participant.scheduleId,
                employeeId: participant.employeeId,
                type: participant.type,
                employee: employees.find((employee) => employee.employeeId === participant.employeeId),
            }));
        }
        return {
            schedule,
            project,
            reservation,
            resource,
            participants,
        };
    }

    /**
     * 복수의 일정과 관계정보들을 벌크로 조회한다
     */
    async 복수_일정과_관계정보들을_조회한다(
        scheduleIds: string[],
        option?: {
            withProject?: boolean;
            withReservation?: boolean;
            withResource?: boolean;
            withParticipants?: boolean;
        },
    ): Promise<
        {
            schedule: Schedule;
            project?: ProjectInfo;
            reservation?: Reservation;
            resource?: Resource;
            participants?: ScheduleParticipantsWithEmployee[];
        }[]
    > {
        if (scheduleIds.length === 0) {
            return [];
        }

        // 1. 모든 일정들을 한 번에 조회
        const schedules = await this.domainScheduleService.findByScheduleIds(scheduleIds);

        const scheduleMap = new Map(schedules.map((schedule) => [schedule.scheduleId, schedule]));

        // 2. 모든 일정관계정보를 한 번에 조회
        const scheduleRelations = await this.domainScheduleRelationService.findByScheduleIds(scheduleIds);
        const relationMap = new Map(scheduleRelations.map((relation) => [relation.scheduleId, relation]));

        // 3. 옵션에 따른 관련 데이터 벌크 조회
        let projectMap = new Map();
        let reservationMap = new Map();
        let resourceMap = new Map();
        let participantsMap = new Map<string, ScheduleParticipantsWithEmployee[]>();

        // 프로젝트 정보 조회 (현재는 구현되지 않음)
        if (option?.withProject) {
            const projectIds = scheduleRelations
                .filter((relation) => relation.projectId)
                .map((relation) => relation.projectId);
            if (projectIds.length > 0) {
                // TODO: 프로젝트 서비스 구현 후 추가
                const { projects, notFound } = await this.domainProjectService.getProjectsByIdsGet(projectIds);
                projectMap = new Map(
                    projects.map((project) => [
                        project.id,
                        { projectId: project.id, projectName: project.projectName },
                    ]),
                );
            }
        }

        // 예약 정보 조회
        if (option?.withReservation) {
            const reservationIds = scheduleRelations
                .filter((relation) => relation.reservationId)
                .map((relation) => relation.reservationId);
            if (reservationIds.length > 0) {
                const reservations = await Promise.all(
                    reservationIds.map((id) => this.domainReservationService.findByReservationId(id)),
                );
                reservations.forEach((reservation) => {
                    reservation.status =
                        reservation.startDate < new Date() && reservation.endDate > new Date()
                            ? ReservationStatus.USING
                            : reservation.status;
                });
                reservationMap = new Map(
                    reservations.filter(Boolean).map((reservation) => [reservation.reservationId, reservation]),
                );

                // 자원 정보 조회
                if (option?.withResource) {
                    const resourceIds = reservations.filter(Boolean).map((reservation) => reservation.resourceId);
                    if (resourceIds.length > 0) {
                        const resources = await Promise.all(
                            resourceIds.map((id) => this.domainResourceService.findByResourceId(id)),
                        );
                        resourceMap = new Map(
                            resources.filter(Boolean).map((resource) => [resource.resourceId, resource]),
                        );
                    }
                }
            }
        }

        // 참가자 정보 조회
        if (option?.withParticipants) {
            const allParticipantsArrays = await Promise.all(
                scheduleIds.map((scheduleId) => this.domainScheduleParticipantService.findByScheduleId(scheduleId)),
            );
            const allParticipants = allParticipantsArrays.flat();

            const employeeIds = [
                ...new Set(allParticipants.map((participant: any) => participant.employeeId as string)),
            ];
            const employees = await this.domainEmployeeService.findByEmployeeIds(employeeIds);
            const employeeMap = new Map(employees.map((employee) => [employee.employeeId, employee]));

            // 일정별 참가자 그룹핑
            const participantGroups = allParticipants.reduce(
                (groups, participant: any) => {
                    if (!groups[participant.scheduleId]) {
                        groups[participant.scheduleId] = [];
                    }
                    groups[participant.scheduleId].push({
                        participantId: participant.participantId,
                        scheduleId: participant.scheduleId,
                        employeeId: participant.employeeId,
                        type: participant.type,
                        employee: employeeMap.get(participant.employeeId),
                    });
                    return groups;
                },
                {} as Record<string, ScheduleParticipantsWithEmployee[]>,
            );

            participantsMap = new Map(Object.entries(participantGroups));
        }

        // 4. 결과 배열 구성
        const results = [];

        for (const scheduleId of scheduleIds) {
            const schedule = scheduleMap.get(scheduleId);
            if (!schedule) {
                continue; // 존재하지 않는 일정은 제외
            }

            const relation = relationMap.get(scheduleId);
            let project = null;
            let reservation = null;
            let resource = null;
            let participants = [];

            if (option?.withProject && relation?.projectId) {
                project = projectMap.get(relation.projectId) || null;
            }

            if (option?.withReservation && relation?.reservationId) {
                reservation = reservationMap.get(relation.reservationId) || null;
                if (option?.withResource && reservation?.resourceId) {
                    resource = resourceMap.get(reservation.resourceId) || null;
                }
            }

            if (option?.withParticipants) {
                participants = participantsMap.get(scheduleId) || [];
            }

            results.push({
                schedule,
                project,
                reservation,
                resource,
                participants,
            });
        }

        return results;
    }

    async 캘린더용_일정을_조회한다(
        date: string,
        category?: ScheduleCategoryType,
        employeeId?: string,
    ): Promise<string[]> {
        // 1. 월별 일정 조회
        const startDateOfMonth = new Date(`${date}-01`);
        const endDateOfMonth = new Date(`${date}-01`);
        endDateOfMonth.setMonth(endDateOfMonth.getMonth() + 1);
        endDateOfMonth.setDate(0);
        endDateOfMonth.setHours(23, 59, 59);

        const monthlySchedules = await this.domainScheduleService.findByDateRange(startDateOfMonth, endDateOfMonth);
        let scheduleIds = monthlySchedules.map((schedule) => schedule.scheduleId);

        // 2. 내 일정만 보기 옵션 처리
        if (employeeId) {
            const myParticipants = await this.domainScheduleParticipantService.findByEmployeeIdAndScheduleIds(
                employeeId,
                scheduleIds,
            );
            scheduleIds = myParticipants.map((participant) => participant.scheduleId);
        }

        // 3. 카테고리별 필터링
        if (category && category !== 'ALL') {
            const scheduleRelations = await this.domainScheduleRelationService.findByScheduleIds(scheduleIds);

            switch (category) {
                case 'SCHEDULE':
                    // 프로젝트도 예약도 없는 순수 일정
                    const pureScheduleRelations = scheduleRelations.filter(
                        (relation) => !relation.projectId && !relation.reservationId,
                    );
                    const pureScheduleIds = pureScheduleRelations.map((r) => r.scheduleId);
                    // 관계정보가 없는 일정들도 포함
                    const schedulesWithoutRelation = scheduleIds.filter(
                        (id) => !scheduleRelations.some((r) => r.scheduleId === id),
                    );
                    scheduleIds = [...pureScheduleIds, ...schedulesWithoutRelation];
                    break;

                case 'PROJECT':
                    // 프로젝트가 있는 일정
                    const projectRelations = scheduleRelations.filter((relation) => relation.projectId);
                    scheduleIds = projectRelations.map((r) => r.scheduleId);
                    break;

                case 'RESOURCE':
                    // 예약이 있는 일정 (자원 관련)
                    const resourceRelations = scheduleRelations.filter((relation) => relation.reservationId);
                    scheduleIds = resourceRelations.map((r) => r.scheduleId);
                    break;
            }
        }

        return [...new Set(scheduleIds)]; // 중복 제거
    }

    async 직원의_역할별_일정ID들을_조회한다(
        employeeId: string,
        role?: ParticipantsType,
        fromDate?: Date,
    ): Promise<string[]> {
        const conditions: any = { employeeId };
        if (role) conditions.type = role;

        const participants = await this.domainScheduleParticipantService.findAll({
            where: conditions,
            select: {
                scheduleId: true,
            },
        });
        let scheduleIds = participants.map((p) => p.scheduleId);

        // 날짜 조건이 있으면 Schedule 테이블과 조인하여 필터링
        if (fromDate && scheduleIds.length > 0) {
            const validSchedules = await this.domainScheduleService.findAll({
                where: {
                    scheduleId: In(scheduleIds),
                    startDate: MoreThanOrEqual(fromDate),
                },
                select: {
                    scheduleId: true,
                },
            });
            scheduleIds = validSchedules.map((s) => s.scheduleId);
        }

        return scheduleIds;
    }

    /**
     * 카테고리별 일정 ID들을 조회한다
     */
    async 카테고리별_일정ID들을_조회한다(
        baseScheduleIds: string[],
        category: 'SCHEDULE' | 'PROJECT' | 'RESOURCE',
    ): Promise<string[]> {
        if (baseScheduleIds.length === 0) return [];

        const scheduleRelations = await this.domainScheduleRelationService.findAll({
            where: { scheduleId: In(baseScheduleIds) },
            select: {
                scheduleId: true,
                projectId: true,
                reservationId: true,
            },
        });

        switch (category) {
            case 'SCHEDULE':
                // 관계정보가 없거나 순수 일정인 것들
                const relationScheduleIds = new Set(scheduleRelations.map((r) => r.scheduleId));
                const pureScheduleIds = baseScheduleIds.filter((id) => !relationScheduleIds.has(id));
                const pureRelationIds = scheduleRelations
                    .filter((r) => !r.projectId && !r.reservationId)
                    .map((r) => r.scheduleId);
                return [...pureScheduleIds, ...pureRelationIds];

            case 'PROJECT':
                return scheduleRelations.filter((r) => r.projectId).map((r) => r.scheduleId);

            case 'RESOURCE':
                return scheduleRelations.filter((r) => r.reservationId).map((r) => r.scheduleId);

            default:
                return baseScheduleIds;
        }
    }

    /**
     * 일정 ID들로 카테고리별 통계를 계산한다 (도메인 서비스 count 활용)
     */
    async 일정ID들로_카테고리별_통계를_계산한다(
        scheduleIds: string[],
        category?: string,
    ): Promise<{ label: string; count: number }[]> {
        if (scheduleIds.length === 0) {
            return [];
        }

        const statistics: { label: string; count: number }[] = [];

        if (!category || category === 'ALL') {
            // 전체 카테고리 통계

            // 일정 총 개수
            const totalScheduleCount = await this.domainScheduleService.count({
                where: { scheduleId: In(scheduleIds) },
            });

            // 프로젝트 관련 일정 개수
            const projectCount = await this.domainScheduleRelationService.count({
                where: {
                    scheduleId: In(scheduleIds),
                    projectId: Not(IsNull()),
                },
            });

            // 자원 관련 일정 개수
            const resourceCount = await this.domainScheduleRelationService.count({
                where: {
                    scheduleId: In(scheduleIds),
                    reservationId: Not(IsNull()),
                },
            });

            statistics.push(
                { label: '일정', count: totalScheduleCount },
                { label: '프로젝트', count: projectCount },
                { label: '자원', count: resourceCount },
            );
        } else if (category === 'SCHEDULE') {
            // 일정 타입별 세부 통계
            const scheduleTypes = [ScheduleType.COMPANY, ScheduleType.DEPARTMENT, ScheduleType.PERSONAL];

            for (const scheduleType of scheduleTypes) {
                const count = await this.domainScheduleService.count({
                    where: {
                        scheduleId: In(scheduleIds),
                        scheduleType: scheduleType,
                    },
                });

                statistics.push({
                    label: this.일정타입_라벨을_가져온다(scheduleType),
                    count: count,
                });
            }
        } else if (category === 'PROJECT') {
            // 프로젝트는 단일 통계
            const projectCount = await this.domainScheduleRelationService.count({
                where: {
                    scheduleId: In(scheduleIds),
                    projectId: Not(IsNull()),
                },
            });

            statistics.push({
                label: '프로젝트',
                count: projectCount,
            });
        } else if (category === 'RESOURCE') {
            // 자원 타입별 세부 통계
            const resourceTypes = [
                ResourceType.MEETING_ROOM,
                ResourceType.VEHICLE,
                ResourceType.ACCOMMODATION,
                ResourceType.EQUIPMENT,
            ];

            for (const resourceType of resourceTypes) {
                // 1. 해당 자원 타입의 일정-예약 관계 조회
                const resourceRelations = await this.domainScheduleRelationService.findAll({
                    where: {
                        scheduleId: In(scheduleIds),
                        reservationId: Not(IsNull()),
                    },
                    select: { reservationId: true },
                });

                if (resourceRelations.length === 0) {
                    statistics.push({
                        label: this.자원타입_라벨을_가져온다(resourceType),
                        count: 0,
                    });
                    continue;
                }

                // 2. 예약 ID들로 해당 자원 타입의 예약들 개수 조회
                const reservationIds = resourceRelations.map((r) => r.reservationId);

                // 3. 자원 타입별 자원 ID들 조회
                const resources = await this.domainResourceService.findAll({
                    where: { type: resourceType },
                    select: { resourceId: true },
                });
                const resourceIds = resources.map((r) => r.resourceId);

                // 4. 해당 자원 타입의 예약 개수 조회
                const count =
                    resourceIds.length > 0
                        ? await this.domainReservationService.count({
                              where: {
                                  reservationId: In(reservationIds),
                                  resourceId: In(resourceIds),
                              },
                          })
                        : 0;

                statistics.push({
                    label: this.자원타입_라벨을_가져온다(resourceType),
                    count: count,
                });
            }
        }

        return statistics;
    }

    /**
     * 키워드로 일정 ID들을 조회한다 (DB LIKE 조건 활용)
     */
    async 키워드로_일정ID들을_조회한다(baseScheduleIds: string[], keyword?: string): Promise<string[]> {
        if (!keyword || keyword.trim() === '' || baseScheduleIds.length === 0) {
            return baseScheduleIds;
        }

        const searchKeyword = `%${keyword.trim()}%`;

        const matchingSchedules = await this.domainScheduleService.findAll({
            where: [
                {
                    scheduleId: In(baseScheduleIds),
                    title: Like(searchKeyword),
                },
                {
                    scheduleId: In(baseScheduleIds),
                    description: Like(searchKeyword),
                },
            ],
            select: {
                scheduleId: true,
            },
        });

        return matchingSchedules.map((s) => s.scheduleId);
    }

    /**
     * 일정 ID들을 페이지네이션 적용한다
     */
    페이지네이션_일정ID들을_계산한다(
        scheduleIds: string[],
        page: number = 1,
        limit: number = 20,
    ): {
        paginatedIds: string[];
        totalCount: number;
        filteredCount: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    } {
        const totalCount = scheduleIds.length;
        const filteredCount = totalCount;
        const totalPages = Math.ceil(totalCount / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        return {
            paginatedIds: scheduleIds.slice(startIndex, endIndex),
            totalCount,
            filteredCount,
            totalPages,
            hasNext: page < totalPages,
            hasPrevious: page > 1,
        };
    }

    async 내_일정을_조회한다(
        employeeId: string,
        query: {
            role?: ParticipantsType;
            category?: 'SCHEDULE' | 'PROJECT' | 'RESOURCE' | 'ALL';
            keyword?: string;
            page?: number;
            limit?: number;
        },
    ): Promise<{
        scheduleIds: string[];
        statistics: { label: string; count: number }[];
        totalCount: number;
        filteredCount: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    }> {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        // 1. 기본 일정 ID 조회 (역할 조건 포함)
        let scheduleIds = await this.직원의_역할별_일정ID들을_조회한다(employeeId, query.role, now);

        // 2. 카테고리별 필터링
        if (query.category && query.category !== 'ALL') {
            scheduleIds = await this.카테고리별_일정ID들을_조회한다(scheduleIds, query.category);
        }

        // 3. 통계 계산 (키워드 검색 전)
        const statistics = await this.일정ID들로_카테고리별_통계를_계산한다(scheduleIds, query.category);
        const totalCount = scheduleIds.length;

        // 4. 키워드 검색 적용
        const filteredScheduleIds = await this.키워드로_일정ID들을_조회한다(scheduleIds, query.keyword);

        // 5. 페이지네이션 적용
        const paginationResult = this.페이지네이션_일정ID들을_계산한다(filteredScheduleIds, query.page, query.limit);

        return {
            scheduleIds: paginationResult.paginatedIds,
            statistics,
            totalCount,
            filteredCount: paginationResult.filteredCount,
            totalPages: paginationResult.totalPages,
            hasNext: paginationResult.hasNext,
            hasPrevious: paginationResult.hasPrevious,
        };
    }

    async 내_일정_내역을_조회한다(
        employeeId: string,
        query: {
            role?: ParticipantsType;
            category?: 'SCHEDULE' | 'PROJECT' | 'RESOURCE' | 'ALL';
            keyword?: string;
            page?: number;
            limit?: number;
        },
    ): Promise<{
        scheduleIds: string[];
        filteredCount: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    }> {
        // 1. 기본 일정 ID 조회 (역할 조건 포함)
        const scheduleIds = await this.직원의_역할별_일정ID들을_조회한다(employeeId, ParticipantsType.RESERVER);

        // 4. 키워드 검색 적용
        const filteredScheduleIds = await this.키워드로_일정ID들을_조회한다(scheduleIds, query.keyword);

        // 5. 페이지네이션 적용
        const paginationResult = this.페이지네이션_일정ID들을_계산한다(filteredScheduleIds, query.page, query.limit);

        return {
            scheduleIds: paginationResult.paginatedIds,
            filteredCount: paginationResult.filteredCount,
            totalPages: paginationResult.totalPages,
            hasNext: paginationResult.hasNext,
            hasPrevious: paginationResult.hasPrevious,
        };
    }

    async 일정들의_예약자정보를_조회한다(
        scheduleIds: string[],
    ): Promise<Map<string, { participant: ScheduleParticipant; employee: Employee }>> {
        const reservers = await this.domainScheduleParticipantService.findReserversByScheduleIds(scheduleIds);
        const employeeIds = [...new Set(reservers.map((reserver) => reserver.employeeId))];
        const employees = await this.domainEmployeeService.findByEmployeeIds(employeeIds);

        // Employee 배열을 Map으로 변환 (빠른 조회를 위해)
        const employeeMap = new Map<string, Employee>();
        employees.forEach((employee) => {
            employeeMap.set(employee.employeeId, employee);
        });

        // 일정별로 예약자 정보를 그룹핑
        const result = new Map<string, { participant: ScheduleParticipant; employee: Employee }>();

        reservers.forEach((reserver) => {
            const employee = employeeMap.get(reserver.employeeId);
            result.set(reserver.scheduleId, {
                participant: reserver,
                employee,
            });
        });

        return result;
    }

    async 일정들의_모든참가자정보를_조회한다(
        scheduleIds: string[],
    ): Promise<Map<string, { participant: ScheduleParticipant; employee: Employee }[]>> {
        const allParticipants = await this.domainScheduleParticipantService.findAllByScheduleIds(scheduleIds);
        const employeeIds = [...new Set(allParticipants.map((participant) => participant.employeeId))];
        const employees = await this.domainEmployeeService.findByEmployeeIds(employeeIds);

        // Employee 배열을 Map으로 변환 (빠른 조회를 위해)
        const employeeMap = new Map<string, Employee>();
        employees.forEach((employee) => {
            employeeMap.set(employee.employeeId, employee);
        });

        // 일정별로 참가자 정보를 그룹핑
        const result = new Map<string, { participant: ScheduleParticipant; employee: Employee }[]>();

        allParticipants.forEach((participant) => {
            const employee = employeeMap.get(participant.employeeId);
            if (employee) {
                const scheduleId = participant.scheduleId;
                if (!result.has(scheduleId)) {
                    result.set(scheduleId, []);
                }
                result.get(scheduleId)!.push({
                    participant,
                    employee,
                });
            }
        });

        return result;
    }

    async 일정들의_프로젝트정보를_조회한다(
        scheduleRelations: ScheduleRelation[],
    ): Promise<Map<string, { projectId: string }>> {
        const validRelations = scheduleRelations.filter((relation) => relation.projectId);

        // scheduleId를 키로 하고 projectId를 값으로 하는 Map 생성 (임시)
        const scheduleProjectMap = new Map<string, { projectId: string }>();
        validRelations.forEach((relation) => {
            scheduleProjectMap.set(relation.scheduleId, { projectId: relation.projectId! });
        });

        return scheduleProjectMap;
    }

    async 일정들의_예약정보를_조회한다(scheduleRelations: ScheduleRelation[]): Promise<Map<string, Reservation>> {
        // reservationId가 있는 관계들만 필터링
        const validRelations = scheduleRelations.filter((relation) => relation.reservationId);
        const reservationIds = validRelations.map((scheduleRelation) => scheduleRelation.reservationId!);

        const reservations = await this.domainReservationService.findByReservationIds(reservationIds);

        // reservationId로 Reservation 객체를 빠르게 찾기 위한 Map
        const reservationByIdMap = new Map<string, Reservation>();
        reservations.forEach((reservation) => {
            reservationByIdMap.set(reservation.reservationId, reservation);
        });

        // scheduleId를 키로 하는 최종 Map 생성
        const scheduleReservationMap = new Map<string, Reservation>();
        validRelations.forEach((relation) => {
            const reservation = reservationByIdMap.get(relation.reservationId!);
            if (reservation) {
                scheduleReservationMap.set(relation.scheduleId, reservation);
            }
        });

        return scheduleReservationMap;
    }

    async 일정들을_역할별로_필터링한다(
        schedules: Schedule[],
        employeeId: string,
        role?: ParticipantsType,
    ): Promise<Schedule[]> {
        if (!role) {
            return schedules; // 역할 필터가 없으면 모든 일정 반환
        }

        const scheduleIds = schedules.map((schedule) => schedule.scheduleId);
        const participants = await this.domainScheduleParticipantService.findByEmployeeIdAndScheduleIds(
            employeeId,
            scheduleIds,
        );

        // 역할별로 필터링 (employeeId는 이미 조회 시 적용됨)
        const filteredParticipants = participants.filter((participant) => participant.type === role);

        const filteredScheduleIds = new Set(filteredParticipants.map((p) => p.scheduleId));

        return schedules.filter((schedule) => filteredScheduleIds.has(schedule.scheduleId));
    }

    async 일정들의_자원정보를_조회한다(
        scheduleRelations: ScheduleRelation[],
    ): Promise<Map<string, { resourceId: string; resourceName: string; resourceType: ResourceType }>> {
        const validRelations = scheduleRelations.filter((relation) => relation.reservationId);
        const reservationIds = validRelations.map((relation) => relation.reservationId!);

        const reservations = await this.domainReservationService.findByReservationIds(reservationIds);

        // 예약에서 자원 ID들을 추출
        const resourceIds = [...new Set(reservations.map((reservation) => reservation.resourceId))];

        // 자원 정보를 일괄 조회
        const resources = await this.domainResourceService.findAll({
            where: resourceIds.map((resourceId) => ({ resourceId })),
        });

        // 자원 ID별 자원 정보 맵 생성
        const resourceMap = new Map();
        resources.forEach((resource) => {
            resourceMap.set(resource.resourceId, resource);
        });

        // 일정별 자원 정보 맵 생성
        const scheduleResourceMap = new Map<
            string,
            { resourceId: string; resourceName: string; resourceType: ResourceType }
        >();

        validRelations.forEach((relation) => {
            const reservation = reservations.find((r) => r.reservationId === relation.reservationId);
            if (reservation) {
                const resource = resourceMap.get(reservation.resourceId);
                if (resource) {
                    const resourceInfo = {
                        resourceId: resource.resourceId,
                        resourceName: resource.name,
                        resourceType: resource.type,
                    };
                    if (!scheduleResourceMap.has(relation.scheduleId)) {
                        scheduleResourceMap.set(relation.scheduleId, resourceInfo);
                    }
                }
            }
        });
        return scheduleResourceMap;
    }

    async 일정들을_카테고리별로_분류한다(
        schedules: Schedule[],
        scheduleRelations: ScheduleRelation[],
    ): Promise<{
        scheduleTypeStats: Map<ScheduleType, Schedule[]>;
        projectStats: Schedule[];
        resourceStats: Map<ResourceType, Schedule[]>;
    }> {
        const scheduleTypeStats = new Map<ScheduleType, Schedule[]>();
        const projectStats: Schedule[] = [];
        const resourceStats = new Map<ResourceType, Schedule[]>();

        // 관계 정보를 scheduleId로 맵핑
        const relationMap = new Map<string, ScheduleRelation[]>();
        scheduleRelations.forEach((relation) => {
            if (!relationMap.has(relation.scheduleId)) {
                relationMap.set(relation.scheduleId, []);
            }
            relationMap.get(relation.scheduleId)!.push(relation);
        });

        // 예약 관련 관계들을 먼저 수집
        const reservationRelations = scheduleRelations.filter((relation) => relation.reservationId);

        // 자원 정보를 일괄 조회 (성능 최적화)
        let scheduleResourceMap = new Map<
            string,
            { resourceId: string; resourceName: string; resourceType: ResourceType }
        >();
        if (reservationRelations.length > 0) {
            scheduleResourceMap = await this.일정들의_자원정보를_조회한다(reservationRelations);
        }

        schedules.forEach((schedule) => {
            const relations = relationMap.get(schedule.scheduleId) || [];

            // 일정 타입별 분류 (Schedule 자체의 scheduleType 사용)
            if (!scheduleTypeStats.has(schedule.scheduleType)) {
                scheduleTypeStats.set(schedule.scheduleType, []);
            }
            scheduleTypeStats.get(schedule.scheduleType)!.push(schedule);

            // 프로젝트 관련 일정 분류
            if (relations.some((r) => r.projectId)) {
                projectStats.push(schedule);
            }
            // 자원 관련 일정 분류 (예약이 있는 경우)
            if (relations.some((r) => r.reservationId)) {
                const scheduleResources = scheduleResourceMap.get(schedule.scheduleId);
                if (scheduleResources) {
                    // 실제 자원 타입을 사용하여 분류
                    const resourceType = scheduleResources.resourceType;
                    if (!resourceStats.has(resourceType)) {
                        resourceStats.set(resourceType, []);
                    }
                    resourceStats.get(resourceType)!.push(schedule);
                }
            }
        });

        return { scheduleTypeStats, projectStats, resourceStats };
    }

    일정들을_키워드로_필터링한다(schedules: Schedule[], keyword?: string): Schedule[] {
        if (!keyword || keyword.trim() === '') {
            return schedules;
        }

        const searchKeyword = keyword.trim().toLowerCase();

        return schedules.filter((schedule) => {
            // 일정 제목과 설명에서 검색
            const titleMatch = schedule.title.toLowerCase().includes(searchKeyword);
            const descriptionMatch = schedule.description?.toLowerCase().includes(searchKeyword) || false;

            return titleMatch || descriptionMatch;
        });
    }

    일정들을_페이지네이션_적용한다(
        schedules: Schedule[],
        page: number = 1,
        limit: number = 20,
    ): { paginatedSchedules: Schedule[]; totalPages: number; hasNext: boolean; hasPrevious: boolean } {
        const totalPages = Math.ceil(schedules.length / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedSchedules = schedules.slice(startIndex, endIndex);

        return {
            paginatedSchedules,
            totalPages,
            hasNext: page < totalPages,
            hasPrevious: page > 1,
        };
    }

    async 자원유형별_일정을_조회한다(
        resourceType: ResourceType,
        resourceIds: string[],
        date?: string,
        month?: string,
    ): Promise<Schedule[]> {
        try {
            let startDate: Date;
            let endDate: Date;
            if (resourceType === ResourceType.ACCOMMODATION && month) {
                // 숙소는 월별 필터링
                startDate = DateUtil.date(`${month}-01`).toDate();
                endDate = DateUtil.date(`${month}-01`).addMonth(1).toDate();
            } else if (date) {
                // 그 외는 일별 필터링
                startDate = DateUtil.date(date).toDate();
                endDate = DateUtil.date(date).addDays(1).toDate();
            }
            const reservations = await this.domainReservationService.findByResourceIdsAndDateRange(
                resourceIds,
                startDate,
                endDate,
            );
            if (reservations.length === 0) {
                return [];
            }

            // 3. 예약에 연결된 일정 관계 정보 조회
            const reservationIds = reservations.map((r) => r.reservationId);
            const scheduleRelations = await this.domainScheduleRelationService.findByReservationIds(reservationIds);
            if (scheduleRelations.length === 0) {
                return [];
            }

            // 4. 일정 ID들로 실제 일정 조회
            const scheduleIds = scheduleRelations.map((sr) => sr.scheduleId);
            const schedules = await this.domainScheduleService.findByScheduleIds(scheduleIds);

            return schedules;
        } catch (error) {
            this.logger.error(`자원유형별 일정 조회 실패: ${error.message}`, error.stack);
            // 오류 발생 시 빈 배열 반환
            return [];
        }
    }

    private filterSchedulesByDate(
        schedules: Schedule[],
        resourceType: ResourceType,
        date?: string,
        month?: string,
    ): Schedule[] {
        if (resourceType === ResourceType.ACCOMMODATION && month) {
            // 숙소는 월별 필터링
            const startOfMonth = new Date(`${month}-01T00:00:00Z`);
            const endOfMonth = new Date(startOfMonth);
            endOfMonth.setMonth(endOfMonth.getMonth() + 1);
            endOfMonth.setDate(0);
            endOfMonth.setHours(23, 59, 59, 999);

            return schedules.filter((schedule) => {
                const scheduleStart = new Date(schedule.startDate);
                const scheduleEnd = new Date(schedule.endDate);

                // 일정이 해당 월과 겹치는지 확인
                return scheduleStart <= endOfMonth && scheduleEnd >= startOfMonth;
            });
        } else if (date) {
            // 그 외는 일별 필터링
            const targetDate = new Date(`${date}T00:00:00Z`);
            const nextDay = new Date(targetDate);
            nextDay.setDate(nextDay.getDate() + 1);

            return schedules.filter((schedule) => {
                const scheduleStart = new Date(schedule.startDate);
                const scheduleEnd = new Date(schedule.endDate);

                // 일정이 해당 날짜와 겹치는지 확인
                return scheduleStart < nextDay && scheduleEnd >= targetDate;
            });
        }

        return schedules;
    }

    async 자원그룹별_자원정보를_조회한다(resourceType: ResourceType): Promise<{
        resourceGroups: ResourceGroup[];
        resources: Resource[];
        resourceMap: Map<string, Resource[]>;
    }> {
        // 자원 타입별로 자원 그룹들 조회
        const allResourceGroups = await this.domainResourceGroupService.findByType(resourceType);

        const resourceGroups = allResourceGroups.filter((group) => group.parentResourceGroupId);
        const resources = await this.domainResourceService.findByResourceGroupIds(
            resourceGroups.map((group) => group.resourceGroupId),
        );
        const resourceMap = new Map<string, Resource[]>();

        // 각 자원 그룹의 자원들을 조회하여 맵에 저장
        for (const resource of resources) {
            if (!resourceMap.has(resource.resourceGroupId)) {
                resourceMap.set(resource.resourceGroupId, []);
            }
            resourceMap.get(resource.resourceGroupId)!.push(resource);
        }

        return { resourceGroups, resources, resourceMap };
    }

    async 자원별_일정정보를_맵핑한다(schedules: Schedule[]): Promise<Map<string, Schedule[]>> {
        if (schedules.length === 0) {
            return new Map<string, Schedule[]>();
        }

        // 일정들의 예약 정보 조회
        const scheduleIds = schedules.map((s) => s.scheduleId);
        const scheduleRelations = await this.domainScheduleRelationService.findByScheduleIds(scheduleIds);

        if (scheduleRelations.length === 0) {
            return new Map<string, Schedule[]>();
        }

        // 예약 ID들로 실제 예약 정보 조회
        const reservationIds = scheduleRelations.filter((r) => r.reservationId).map((r) => r.reservationId);

        if (reservationIds.length === 0) {
            return new Map<string, Schedule[]>();
        }

        const reservations = await this.domainReservationService.findByReservationIds(reservationIds);

        // 예약 ID별 자원 ID 매핑
        const reservationToResourceMap = new Map<string, string>();
        reservations.forEach((reservation) => {
            if (reservation.resourceId) {
                reservationToResourceMap.set(reservation.reservationId, reservation.resourceId);
            }
        });

        const resourceScheduleMap = new Map<string, Schedule[]>();

        // 각 일정을 실제 자원 ID별로 그룹핑
        schedules.forEach((schedule) => {
            const relation = scheduleRelations.find((r) => r.scheduleId === schedule.scheduleId);

            if (relation && relation.reservationId) {
                const resourceId = reservationToResourceMap.get(relation.reservationId);

                if (resourceId) {
                    if (!resourceScheduleMap.has(resourceId)) {
                        resourceScheduleMap.set(resourceId, []);
                    }
                    resourceScheduleMap.get(resourceId)!.push(schedule);
                }
            }
        });

        return resourceScheduleMap;
    }

    /**
     * 일정의 참가자들을 예약자와 일반 참가자로 분리하여 조회
     */
    async 일정의_참가자들을_분리하여_조회한다(scheduleId: string): Promise<{
        reserver?: {
            participantId: string;
            employeeId: string;
            employeeName: string;
            participantType: string;
        };
        participants: {
            participantId: string;
            employeeId: string;
            employeeName: string;
            participantType: string;
        }[];
    }> {
        // 일정의 모든 참가자 정보 조회
        const allParticipantsMap = await this.일정들의_모든참가자정보를_조회한다([scheduleId]);
        const allParticipants = allParticipantsMap.get(scheduleId) || [];

        let reserver: any = undefined;
        const participants: any[] = [];

        // 참가자들을 예약자와 일반 참가자로 분리
        allParticipants.forEach(({ participant, employee }) => {
            const participantDto = {
                participantId: participant.participantId,
                employeeId: employee.employeeId,
                employeeName: employee.name,
                participantType: participant.type,
            };

            if (participant.type === ParticipantsType.RESERVER) {
                reserver = participantDto;
            } else {
                participants.push(participantDto);
            }
        });

        return {
            reserver,
            participants,
        };
    }

    /**
     * 프로젝트 존재 여부 확인
     */
    async 프로젝트_존재여부를_확인한다(projectId: string): Promise<boolean> {
        const { projects, notFound } = await this.domainProjectService.getProjectsByIdsGet([projectId]);
        return projects.length > 0 && notFound.length === 0;
    }

    /**
     * 자원 정보 조회
     */
    async 자원정보를_조회한다(resourceId: string): Promise<any> {
        try {
            const resource = await this.domainResourceService.findOne({
                where: { resourceId },
            });
            return resource;
        } catch (error) {
            this.logger.error(`자원 정보 조회 실패: ${error.message}`, error.stack);
            return null;
        }
    }

    /**
     * 카테고리별 통계 생성 (레거시에서 이동)
     */
    카테고리별_통계를_생성한다(
        scheduleTypeStats: Map<string, Schedule[]>,
        projectStats: Schedule[],
        resourceStats: Map<string, Schedule[]>,
        category?: string,
    ): { label: string; count: number }[] {
        const statistics: { label: string; count: number }[] = [];

        if (!category || category === 'ALL') {
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
        } else if (category === 'SCHEDULE') {
            // 일정 타입별 세부 통계 (모든 ScheduleType 표시)
            const scheduleTypes = ['COMPANY', 'DEPARTMENT', 'PERSONAL']; // ScheduleType enum values
            scheduleTypes.forEach((scheduleType) => {
                const scheduleList = scheduleTypeStats.get(scheduleType) || [];
                statistics.push({
                    label: this.일정타입_라벨을_가져온다(scheduleType),
                    count: scheduleList.length,
                });
            });
        } else if (category === 'PROJECT') {
            // 프로젝트는 단일 통계
            statistics.push({
                label: '프로젝트',
                count: projectStats.length,
            });
        } else if (category === 'RESOURCE') {
            // 자원 타입별 세부 통계 (모든 ResourceType 표시)
            const resourceTypes = ['MEETING_ROOM', 'VEHICLE', 'ACCOMMODATION', 'EQUIPMENT']; // ResourceType enum values
            resourceTypes.forEach((resourceType) => {
                const scheduleList = resourceStats.get(resourceType) || [];
                statistics.push({
                    label: this.자원타입_라벨을_가져온다(resourceType),
                    count: scheduleList.length,
                });
            });
        }

        return statistics;
    }

    /**
     * 카테고리별 필터링 (레거시에서 이동)
     */
    카테고리별로_필터링한다(
        scheduleTypeStats: Map<string, Schedule[]>,
        projectStats: Schedule[],
        resourceStats: Map<string, Schedule[]>,
        category: string,
    ): Schedule[] {
        switch (category) {
            case 'SCHEDULE':
                return Array.from(scheduleTypeStats.values()).flat();
            case 'PROJECT':
                return projectStats;
            case 'RESOURCE':
                return Array.from(resourceStats.values()).flat();
            default:
                return [];
        }
    }

    /**
     * 자원 타입 라벨 반환
     */
    자원타입_라벨을_가져온다(resourceType: string): string {
        switch (resourceType) {
            case 'MEETING_ROOM':
                return '회의실';
            case 'VEHICLE':
                return '차량';
            case 'ACCOMMODATION':
                return '숙소';
            case 'EQUIPMENT':
                return '장비';
            default:
                return resourceType;
        }
    }

    /**
     * 일정 타입 라벨 반환
     */
    일정타입_라벨을_가져온다(type: string): string {
        switch (type) {
            case 'COMPANY':
                return '회사전체일정';
            case 'DEPARTMENT':
                return '부서일정';
            case 'PERSONAL':
                return '개인일정';
            default:
                return type;
        }
    }

    /**
     * 자원별 일정 조회 조건에 맞는 데이터를 조회한다
     */
    async 자원별_일정_조회_데이터를_조회한다(
        resourceType: ResourceType,
        date?: string,
        month?: string,
    ): Promise<{
        scheduleDataList: {
            schedule: Schedule;
            reservation?: Reservation;
            resource?: Resource;
            participants?: ScheduleParticipantsWithEmployee[];
        }[];
        resourceGroups: ResourceGroup[];
        resourceMap: Map<string, Resource[]>;
    }> {
        // 1. 자원유형별 일정 조회

        // 2. 자원그룹별 자원정보 조회 (일정이 없어도 자원 그룹은 표시해야 함)
        const { resourceGroups, resources, resourceMap } = await this.자원그룹별_자원정보를_조회한다(resourceType);
        const schedules = await this.자원유형별_일정을_조회한다(
            resourceType,
            resources.map((r) => r.resourceId),
            date,
            month,
        );

        if (schedules.length === 0) {
            return {
                scheduleDataList: [],
                resourceGroups,
                resourceMap,
            };
        }

        // 3. 벌크 조회로 일정 관련 데이터 모두 획득
        const scheduleIds = schedules.map((s) => s.scheduleId);
        const scheduleDataList = await this.복수_일정과_관계정보들을_조회한다(scheduleIds, {
            withReservation: true,
            withResource: true,
            withParticipants: true,
        });

        return {
            scheduleDataList,
            resourceGroups,
            resourceMap,
        };
    }
}
