import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainScheduleService } from '@src/domain/schedule/schedule.service';
import { DomainScheduleParticipantService } from '@src/domain/schedule-participant/schedule-participant.service';
import { DomainScheduleRelationService } from '@src/domain/schedule-relation/schedule-relation.service';
import { Schedule } from '@libs/entities/schedule.entity';
import { ScheduleParticipant } from '@libs/entities/schedule-participant.entity';
import { ScheduleRelation } from '@libs/entities/schedule-relations.entity';
import { Employee } from '@libs/entities/employee.entity';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
// import { DomainProjectService } from '@src/domain/project/project.service';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { Reservation } from '@libs/entities/reservation.entity';

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
            console.log(startDateOfMonth, endDateOfMonth);

            return await this.domainScheduleService.findByDateRange(startDateOfMonth, endDateOfMonth);
        } catch (error) {
            this.logger.error(`월별 일정 조회 실패: ${error.message}`, error.stack);
            throw new BadRequestException('월별 일정 조회 중 오류가 발생했습니다.');
        }
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
}
