import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { Schedule } from '@libs/entities/schedule.entity';
import { Reservation } from '@libs/entities/reservation.entity';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ScheduleStatus } from '@libs/enums/schedule-type.enum';
import { DomainScheduleService } from '../../../domain/schedule/schedule.service';
import { DomainReservationService } from '../../../domain/reservation/reservation.service';
import { DateUtil } from '@libs/utils/date.util';

export interface ScheduleCancelResult {
    schedule: Schedule;
    reservation?: Reservation;
    cancelledAt: Date;
}

export interface ScheduleCompleteResult {
    schedule: Schedule;
    reservation?: Reservation;
    completedAt: Date;
}

export interface ScheduleExtendResult {
    schedule: Schedule;
    reservation?: Reservation;
    originalEndDate: Date;
    newEndDate: Date;
}

export interface ScheduleUpdateResult {
    schedule: Schedule;
    reservation?: Reservation;
    changes: Record<string, { from: any; to: any }>;
}

@Injectable()
export class ScheduleStateTransitionService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly domainScheduleService: DomainScheduleService,
        private readonly domainReservationService: DomainReservationService,
    ) {}

    async 일정을_취소한다(
        schedule: Schedule,
        reservation: Reservation | undefined,
        cancelReason?: string,
        queryRunner?: QueryRunner,
    ): Promise<ScheduleCancelResult> {
        const shouldManageTransaction = !queryRunner;
        if (shouldManageTransaction) {
            queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
        }

        try {
            const cancelledAt = DateUtil.now().toDate();

            if (reservation) {
                await this.domainReservationService.update(
                    reservation.reservationId,
                    { status: ReservationStatus.CANCELLED },
                    { queryRunner },
                );

                reservation = await this.domainReservationService.findOne({
                    where: { reservationId: reservation.reservationId },
                });
            }

            const updatedDescription = schedule.description
                ? `${schedule.description}\n\n[${DateUtil.format(cancelledAt, 'YYYY-MM-DD HH:mm')}] 일정이 취소되었습니다.${cancelReason ? ` 사유: ${cancelReason}` : ''}`
                : `[${DateUtil.format(cancelledAt, 'YYYY-MM-DD HH:mm')}] 일정이 취소되었습니다.${cancelReason ? ` 사유: ${cancelReason}` : ''}`;

            await this.domainScheduleService.update(
                schedule.scheduleId,
                {
                    status: ScheduleStatus.CANCELLED,
                    description: updatedDescription,
                    completionReason: cancelReason,
                },
                { queryRunner },
            );

            if (shouldManageTransaction) {
                await queryRunner.commitTransaction();
            }

            const updatedSchedule = await this.domainScheduleService.findOne({
                where: { scheduleId: schedule.scheduleId },
            });

            return { schedule: updatedSchedule!, reservation, cancelledAt };
        } catch (error) {
            if (shouldManageTransaction) {
                await queryRunner.rollbackTransaction();
            }
            throw error;
        } finally {
            if (shouldManageTransaction) {
                await queryRunner.release();
            }
        }
    }

    async 일정을_완료한다(
        schedule: Schedule,
        reservation: Reservation | undefined,
        completionNotes?: string,
        queryRunner?: QueryRunner,
    ): Promise<ScheduleCompleteResult> {
        const shouldManageTransaction = !queryRunner;
        if (shouldManageTransaction) {
            queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
        }

        try {
            const completedAt = DateUtil.now().toDate();

            if (reservation) {
                await this.domainReservationService.update(
                    reservation.reservationId,
                    { status: ReservationStatus.CLOSED },
                    { queryRunner },
                );

                reservation = await this.domainReservationService.findOne({
                    where: { reservationId: reservation.reservationId },
                });
            }

            const completionInfo = `[${DateUtil.format(completedAt, 'YYYY-MM-DD HH:mm')}] 일정이 완료되었습니다.${completionNotes ? ` 완료 메모: ${completionNotes}` : ''}`;
            const updatedDescription = schedule.description
                ? `${schedule.description}\n\n${completionInfo}`
                : completionInfo;

            await this.domainScheduleService.update(
                schedule.scheduleId,
                {
                    status: ScheduleStatus.COMPLETED,
                    description: updatedDescription,
                    completionReason: completionNotes,
                },
                { queryRunner },
            );

            if (shouldManageTransaction) {
                await queryRunner.commitTransaction();
            }

            const updatedSchedule = await this.domainScheduleService.findOne({
                where: { scheduleId: schedule.scheduleId },
            });

            return { schedule: updatedSchedule!, reservation, completedAt };
        } catch (error) {
            if (shouldManageTransaction) {
                await queryRunner.rollbackTransaction();
            }
            throw error;
        } finally {
            if (shouldManageTransaction) {
                await queryRunner.release();
            }
        }
    }

    async 일정을_연장한다(
        schedule: Schedule,
        reservation: Reservation | undefined,
        newEndDate: Date,
        extendReason?: string,
        queryRunner?: QueryRunner,
    ): Promise<ScheduleExtendResult> {
        const shouldManageTransaction = !queryRunner;
        if (shouldManageTransaction) {
            queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
        }

        try {
            const originalEndDate = schedule.endDate;

            if (reservation) {
                await this.domainReservationService.update(
                    reservation.reservationId,
                    { endDate: newEndDate },
                    { queryRunner },
                );

                reservation = await this.domainReservationService.findOne({
                    where: { reservationId: reservation.reservationId },
                });
            }

            const extendInfo = `[${DateUtil.format(DateUtil.now().toDate(), 'YYYY-MM-DD HH:mm')}] 일정이 ${DateUtil.format(originalEndDate, 'HH:mm')}에서 ${DateUtil.format(newEndDate, 'HH:mm')}로 연장되었습니다.${extendReason ? ` 사유: ${extendReason}` : ''}`;
            const updatedDescription = schedule.description ? `${schedule.description}\n\n${extendInfo}` : extendInfo;

            await this.domainScheduleService.update(
                schedule.scheduleId,
                { endDate: newEndDate, description: updatedDescription },
                { queryRunner },
            );

            if (shouldManageTransaction) {
                await queryRunner.commitTransaction();
            }

            const updatedSchedule = await this.domainScheduleService.findOne({
                where: { scheduleId: schedule.scheduleId },
            });

            return { schedule: updatedSchedule!, reservation, originalEndDate, newEndDate };
        } catch (error) {
            if (shouldManageTransaction) {
                await queryRunner.rollbackTransaction();
            }
            throw error;
        } finally {
            if (shouldManageTransaction) {
                await queryRunner.release();
            }
        }
    }

    async 일정을_수정한다(
        schedule: Schedule,
        reservation: Reservation | undefined,
        updateData: {
            title?: string;
            description?: string;
            startDate?: Date;
            endDate?: Date;
            notifyBeforeStart?: boolean;
            notifyMinutesBeforeStart?: number[];
        },
        updateReason?: string,
        queryRunner?: QueryRunner,
    ): Promise<ScheduleUpdateResult> {
        const shouldManageTransaction = !queryRunner;
        if (shouldManageTransaction) {
            queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
        }

        try {
            const changes: Record<string, { from: any; to: any }> = {};
            const scheduleUpdates: any = {};

            if (updateData.title !== undefined && updateData.title !== schedule.title) {
                changes.title = { from: schedule.title, to: updateData.title };
                scheduleUpdates.title = updateData.title;
            }

            if (updateData.startDate !== undefined && updateData.startDate.getTime() !== schedule.startDate.getTime()) {
                changes.startDate = { from: schedule.startDate, to: updateData.startDate };
                scheduleUpdates.startDate = updateData.startDate;
            }

            if (updateData.endDate !== undefined && updateData.endDate.getTime() !== schedule.endDate.getTime()) {
                changes.endDate = { from: schedule.endDate, to: updateData.endDate };
                scheduleUpdates.endDate = updateData.endDate;
            }

            if (updateData.description !== undefined) {
                scheduleUpdates.description = updateData.description;
            }

            if (Object.keys(changes).length > 0) {
                const changeLog = `[${DateUtil.format(DateUtil.now().toDate(), 'YYYY-MM-DD HH:mm')}] 일정이 수정되었습니다.${updateReason ? ` 사유: ${updateReason}` : ''}`;
                const currentDescription =
                    scheduleUpdates.description !== undefined ? scheduleUpdates.description : schedule.description;
                scheduleUpdates.description = currentDescription ? `${currentDescription}\n\n${changeLog}` : changeLog;
            }

            if (Object.keys(scheduleUpdates).length > 0) {
                await this.domainScheduleService.update(schedule.scheduleId, scheduleUpdates, { queryRunner });
            }

            if (shouldManageTransaction) {
                await queryRunner.commitTransaction();
            }

            const updatedSchedule = await this.domainScheduleService.findOne({
                where: { scheduleId: schedule.scheduleId },
            });

            return { schedule: updatedSchedule!, reservation, changes };
        } catch (error) {
            if (shouldManageTransaction) {
                await queryRunner.rollbackTransaction();
            }
            throw error;
        } finally {
            if (shouldManageTransaction) {
                await queryRunner.release();
            }
        }
    }
}
