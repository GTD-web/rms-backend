import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainScheduleService } from '@src/domain/schedule/schedule.service';
import { DomainScheduleParticipantService } from '@src/domain/schedule-participant/schedule-participant.service';
import { DomainScheduleRelationService } from '@src/domain/schedule-relation/schedule-relation.service';
import { CreateScheduleDto, CreateScheduleParticipantDto, CreateScheduleRelationDto } from './dtos/create-schedule.dto';
import { QueryRunner } from 'typeorm';
import { Schedule } from '@libs/entities/schedule.entity';
import { ScheduleParticipant } from '@libs/entities/schedule-participant.entity';
import { ScheduleRelation } from '@libs/entities/schedule-relations.entity';
import { Employee } from '@libs/entities/employee.entity';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
// import { DomainProjectService } from '@src/domain/project/project.service';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { Reservation } from '@libs/entities/reservation.entity';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ScheduleType } from '@libs/enums/schedule-type.enum';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { Resource } from '@libs/entities/resource.entity';
import { ResourceGroup } from '@libs/entities/resource-group.entity';

@Injectable()
export class ScheduleContextService {
    private readonly logger = new Logger(ScheduleContextService.name);

    constructor(
        private readonly domainScheduleService: DomainScheduleService,
        private readonly domainScheduleParticipantService: DomainScheduleParticipantService,
        private readonly domainScheduleRelationService: DomainScheduleRelationService,
        private readonly domainEmployeeService: DomainEmployeeService,
        // private readonly domainProjectService: DomainProjectService,
        private readonly domainReservationService: DomainReservationService,
        private readonly domainResourceService: DomainResourceService,
        private readonly domainResourceGroupService: DomainResourceGroupService,
    ) {}

    async 일정들을_조회한다(scheduleIds: string[]): Promise<Schedule[]> {
        return await this.domainScheduleService.findByScheduleIds(scheduleIds);
    }

    async 월별_일정을_조회한다(date: string): Promise<Schedule[]> {
        try {
            this.logger.log(`월별 일정 조회 요청: ${date}`);
            const startDateOfMonth = new Date(`${date}-01`);
            const endDateOfMonth = new Date(`${date}-01`);
            endDateOfMonth.setMonth(endDateOfMonth.getMonth() + 1);
            endDateOfMonth.setDate(0);
            endDateOfMonth.setHours(23, 59, 59);

            return await this.domainScheduleService.findByDateRange(startDateOfMonth, endDateOfMonth);
        } catch (error) {
            this.logger.error(`월별 일정 조회 실패: ${error.message}`, error.stack);
            throw new BadRequestException('월별 일정 조회 중 오류가 발생했습니다.');
        }
    }

    async 직원의_다가올_일정을_조회한다(employeeId: string): Promise<Schedule[]> {
        return await this.domainScheduleService.findByEmployeeIdFromNow(employeeId);
    }

    async 일정관계정보를_조회한다(scheduleIds: string[]): Promise<ScheduleRelation[]> {
        return await this.domainScheduleRelationService.findByScheduleIds(scheduleIds);
    }

    async 직원의_일정을_조회한다(employeeId: string, scheduleIds: string[]): Promise<ScheduleParticipant[]> {
        return await this.domainScheduleParticipantService.findByEmployeeIdAndScheduleIds(employeeId, scheduleIds);
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
    ): Promise<Map<string, { resourceName: string; resourceType: ResourceType }[]>> {
        const validRelations = scheduleRelations.filter((relation) => relation.reservationId);
        const reservationIds = validRelations.map((relation) => relation.reservationId!);

        const reservations = await this.domainReservationService.findByReservationIds(reservationIds);

        // TODO: Reservation에서 자원 정보를 가져오는 로직 (실제 구현 시 자원 도메인 서비스 사용)
        // 임시로 예약 ID를 기반으로 자원 정보 맵핑
        const scheduleResourceMap = new Map<string, { resourceName: string; resourceType: ResourceType }[]>();

        validRelations.forEach((relation) => {
            const reservation = reservations.find((r) => r.reservationId === relation.reservationId);
            if (reservation) {
                // TODO: 실제 자원 정보 조회 로직으로 교체
                const resourceInfo = {
                    resourceName: `자원_${reservation.reservationId.slice(-4)}`,
                    resourceType: ResourceType.MEETING_ROOM, // 임시값
                };

                if (!scheduleResourceMap.has(relation.scheduleId)) {
                    scheduleResourceMap.set(relation.scheduleId, []);
                }
                scheduleResourceMap.get(relation.scheduleId)!.push(resourceInfo);
            }
        });

        return scheduleResourceMap;
    }

    일정들을_카테고리별로_분류한다(
        schedules: Schedule[],
        scheduleRelations: ScheduleRelation[],
    ): {
        scheduleTypeStats: Map<ScheduleType, Schedule[]>;
        projectStats: Schedule[];
        resourceStats: Map<ResourceType, Schedule[]>;
    } {
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
                // TODO: 실제 자원 타입 조회 로직 구현
                // 임시로 MEETING_ROOM으로 설정
                const resourceType = ResourceType.MEETING_ROOM;
                if (!resourceStats.has(resourceType)) {
                    resourceStats.set(resourceType, []);
                }
                resourceStats.get(resourceType)!.push(schedule);
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

    async 자원유형별_일정을_조회한다(resourceType: ResourceType, date?: string, month?: string): Promise<Schedule[]> {
        try {
            // 1. 해당 자원 타입의 모든 자원 조회
            const resources = await this.domainResourceService.findAll({
                where: { type: resourceType },
            });

            if (resources.length === 0) {
                return [];
            }

            const resourceIds = resources.map((r) => r.resourceId);

            // 2. 해당 자원들의 예약 정보 조회
            const reservations = await this.domainReservationService.findByResourceIds(resourceIds);

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

            // 5. 날짜 조건으로 필터링
            return this.filterSchedulesByDate(schedules, resourceType, date, month);
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
        resourceMap: Map<string, Resource[]>;
    }> {
        // 자원 타입별로 자원 그룹들 조회
        const allResourceGroups = await this.domainResourceGroupService.findByType(resourceType);

        const resourceGroups = allResourceGroups.filter((group) => group.parentResourceGroupId);

        const resourceMap = new Map<string, Resource[]>();

        // 각 자원 그룹의 자원들을 조회하여 맵에 저장
        for (const group of resourceGroups) {
            if (group.resources && group.resources.length > 0) {
                resourceMap.set(group.resourceGroupId, group.resources);
            } else {
                // relations에서 로드되지 않은 경우 별도 조회
                const resources = await this.domainResourceService.findAll({
                    where: { resourceGroupId: group.resourceGroupId },
                });
                resourceMap.set(group.resourceGroupId, resources);
            }
        }

        return { resourceGroups, resourceMap };
    }

    private getResourceTypeKoreanName(resourceType: ResourceType): string {
        switch (resourceType) {
            case ResourceType.MEETING_ROOM:
                return '회의실';
            case ResourceType.VEHICLE:
                return '차량';
            case ResourceType.ACCOMMODATION:
                return '숙소';
            case ResourceType.EQUIPMENT:
                return '장비';
            default:
                return '자원';
        }
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

    async 일정을_생성한다(scheduleData: CreateScheduleDto, queryRunner?: QueryRunner): Promise<Schedule> {
        const scheduleEntity = {
            title: scheduleData.title,
            description: scheduleData.description,
            startDate: scheduleData.startDate,
            endDate: scheduleData.endDate,
            notifyBeforeStart: scheduleData.notifyBeforeStart || false,
            notifyMinutesBeforeStart: scheduleData.notifyMinutesBeforeStart || [],
            scheduleType: scheduleData.scheduleType,
        };

        // 도메인 서비스를 사용하여 트랜잭션 내에서 생성
        const savedSchedule = await this.domainScheduleService.save(scheduleEntity, {
            queryRunner: queryRunner,
        });

        return savedSchedule;
    }

    async 일정_참가자를_추가한다(
        scheduleId: string,
        employeeId: string,
        type: string,
        queryRunner?: QueryRunner,
    ): Promise<void> {
        const participantDto: CreateScheduleParticipantDto = {
            scheduleId,
            employeeId,
            type,
        };

        const participantEntity = {
            scheduleId: participantDto.scheduleId,
            employeeId: participantDto.employeeId,
            type: participantDto.type as ParticipantsType,
        };

        // 도메인 서비스를 사용하여 트랜잭션 내에서 생성
        await this.domainScheduleParticipantService.save(participantEntity, {
            queryRunner: queryRunner,
        });
    }

    async 일정관계정보를_생성한다(relationData: CreateScheduleRelationDto, queryRunner?: QueryRunner): Promise<void> {
        const relationEntity = {
            scheduleId: relationData.scheduleId,
            projectId: relationData.projectId,
            reservationId: relationData.reservationId,
        };

        // 도메인 서비스를 사용하여 트랜잭션 내에서 생성
        await this.domainScheduleRelationService.save(relationEntity, {
            queryRunner: queryRunner,
        });
    }
}
