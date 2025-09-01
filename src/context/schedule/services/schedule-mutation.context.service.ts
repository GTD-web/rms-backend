import { Injectable, Logger } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { DomainScheduleService } from '@src/domain/schedule/schedule.service';
import { DomainScheduleParticipantService } from '@src/domain/schedule-participant/schedule-participant.service';
import { DomainScheduleRelationService } from '@src/domain/schedule-relation/schedule-relation.service';
import {
    CreateScheduleDto,
    CreateScheduleParticipantDto,
    CreateScheduleRelationDto,
} from '../dtos/create-schedule.dto';
import { Schedule } from '@libs/entities/schedule.entity';
import { ScheduleRelation } from '@libs/entities/schedule-relations.entity';
import { ScheduleStatus, ScheduleType } from '@libs/enums/schedule-type.enum';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';

export interface ScheduleCreateResult {
    createdSchedules: Schedule[];
    failedSchedules: { startDate: string; endDate: string; reason: string }[];
}

@Injectable()
export class ScheduleMutationContextService {
    private readonly logger = new Logger(ScheduleMutationContextService.name);

    constructor(
        private readonly dataSource: DataSource,
        private readonly domainScheduleService: DomainScheduleService,
        private readonly domainScheduleParticipantService: DomainScheduleParticipantService,
        private readonly domainScheduleRelationService: DomainScheduleRelationService,
    ) {}

    /**
     * 일정을 생성합니다
     */
    async 일정을_생성한다(scheduleData: CreateScheduleDto, queryRunner?: QueryRunner): Promise<Schedule> {
        const scheduleEntity = {
            title: scheduleData.title,
            description: scheduleData.description,
            startDate: scheduleData.startDate,
            endDate: scheduleData.endDate,
            notifyBeforeStart: scheduleData.notifyBeforeStart || false,
            notifyMinutesBeforeStart: scheduleData.notifyMinutesBeforeStart || [],
            scheduleType: scheduleData.scheduleType,
            status: scheduleData.startDate < new Date() ? ScheduleStatus.PROCESSING : ScheduleStatus.PENDING, // 기본 상태 설정
        };

        // 도메인 서비스를 사용하여 트랜잭션 내에서 생성
        const savedSchedule = await this.domainScheduleService.save(scheduleEntity, {
            queryRunner: queryRunner,
        });

        return savedSchedule;
    }

    /**
     * 일정 참가자를 추가합니다
     */
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

    /**
     * 일정관계정보를 생성합니다
     */
    async 일정관계정보를_생성한다(
        relationData: CreateScheduleRelationDto,
        queryRunner?: QueryRunner,
    ): Promise<ScheduleRelation> {
        const relationEntity = {
            scheduleId: relationData.scheduleId,
            projectId: relationData.projectId,
            reservationId: relationData.reservationId,
        };

        // 도메인 서비스를 사용하여 트랜잭션 내에서 생성
        return await this.domainScheduleRelationService.save(relationEntity, {
            queryRunner: queryRunner,
        });
    }

    /**
     * 일정 상태를 업데이트합니다
     */
    async 일정_상태를_변경한다(
        scheduleId: string,
        status: ScheduleStatus,
        completionReason?: string,
        queryRunner?: QueryRunner,
    ): Promise<void> {
        const updateData: any = { status };

        if (completionReason) {
            updateData.completionReason = completionReason;
        }

        await this.domainScheduleService.update(scheduleId, updateData, { queryRunner });
    }

    // /**
    //  * 다중 일정을 생성합니다 (레거시 로직 유지)
    //  * - 날짜별로 개별 트랜잭션 처리
    //  * - 실패한 일정과 성공한 일정을 분리하여 반환
    //  */
    // async 다중_일정을_생성한다(
    //     user: any,
    //     createData: {
    //         title: string;
    //         description?: string;
    //         location?: string;
    //         scheduleType: ScheduleType;
    //         notifyBeforeStart?: boolean;
    //         notifyMinutesBeforeStart?: number[];
    //         participants: { employeeId: string }[];
    //         datesSelection: { startDate: string; endDate: string }[];
    //         resourceSelection?: {
    //             resourceId: string;
    //             resourceType: ResourceType;
    //         };
    //         projectSelection?: {
    //             projectId: string;
    //         };
    //     },
    // ): Promise<ScheduleCreateResult> {
    //     const createdSchedules = [];
    //     const failedSchedules = [];
    //     const {
    //         title,
    //         description,
    //         location,
    //         scheduleType,
    //         notifyBeforeStart,
    //         notifyMinutesBeforeStart,
    //         participants,
    //         datesSelection,
    //         resourceSelection,
    //         projectSelection,
    //     } = createData;

    //     // 레거시 로직 유지: 날짜별 트랜잭션 처리
    //     for (const dateRange of datesSelection) {
    //         // 트랜잭션 시작 - 개별 일정에 대한 모든 작업
    //         const queryRunner = this.dataSource.createQueryRunner();
    //         await queryRunner.connect();
    //         await queryRunner.startTransaction();

    //         try {
    //             // 1) 일정 생성
    //             const scheduleData = {
    //                 title,
    //                 description: location ? `${description || ''}\n장소: ${location}`.trim() : description,
    //                 startDate: new Date(dateRange.startDate),
    //                 endDate: new Date(dateRange.endDate),
    //                 scheduleType,
    //                 notifyBeforeStart: notifyBeforeStart || false,
    //                 notifyMinutesBeforeStart: notifyMinutesBeforeStart || [],
    //             };

    //             const createdSchedule = await this.일정을_생성한다(scheduleData, queryRunner);

    //             // 2) 참가자 생성
    //             // 예약자(요청자) 추가
    //             await this.일정_참가자를_추가한다(
    //                 createdSchedule.scheduleId!,
    //                 user.employeeId,
    //                 'RESERVER',
    //                 queryRunner,
    //             );

    //             // 다른 참석자들 추가
    //             for (const participant of participants) {
    //                 if (participant.employeeId !== user.employeeId) {
    //                     await this.일정_참가자를_추가한다(
    //                         createdSchedule.scheduleId!,
    //                         participant.employeeId,
    //                         'PARTICIPANT',
    //                         queryRunner,
    //                     );
    //                 }
    //             }

    //             // 3) 자원예약 생성 (있는 경우)
    //             let reservationId: string | null = null;
    //             if (resourceSelection) {
    //                 const reservationData = {
    //                     title: title,
    //                     description: description || '',
    //                     resourceId: resourceSelection.resourceId,
    //                     resourceType: resourceSelection.resourceType,
    //                     status:
    //                         resourceSelection.resourceType === ResourceType.ACCOMMODATION
    //                             ? ReservationStatus.PENDING
    //                             : ReservationStatus.CONFIRMED,
    //                     startDate: new Date(dateRange.startDate),
    //                     endDate: new Date(dateRange.endDate),
    //                 };

    //                 const createdReservation = await this.reservationContextService.자원예약을_생성한다(
    //                     reservationData,
    //                     queryRunner,
    //                 );
    //                 reservationId = createdReservation.reservationId!;
    //             }

    //             // 4) 일정관계정보 생성
    //             const relationData = {
    //                 scheduleId: createdSchedule.scheduleId!,
    //                 projectId: projectSelection?.projectId || null,
    //                 reservationId: reservationId,
    //             };

    //             await this.일정관계정보를_생성한다(relationData, queryRunner);

    //             // 트랜잭션 커밋
    //             await queryRunner.commitTransaction();
    //             createdSchedules.push(createdSchedule);
    //         } catch (error) {
    //             // 트랜잭션 롤백
    //             await queryRunner.rollbackTransaction();

    //             failedSchedules.push({
    //                 startDate: dateRange.startDate,
    //                 endDate: dateRange.endDate,
    //                 reason: `일정 생성 실패: ${error.message}`,
    //             });
    //         } finally {
    //             // 쿼리러너 해제
    //             await queryRunner.release();
    //         }
    //     }

    //     return {
    //         createdSchedules,
    //         failedSchedules,
    //     };
    // }
}
