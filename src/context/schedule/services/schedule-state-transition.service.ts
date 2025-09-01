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
    ): Promise<boolean> {
        const shouldManageTransaction = !queryRunner;
        if (shouldManageTransaction) {
            queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
        }

        try {
            if (reservation) {
                await this.domainReservationService.update(
                    reservation.reservationId,
                    { status: ReservationStatus.CANCELLED },
                    { queryRunner },
                );
            }

            // const updatedDescription = schedule.description
            //     ? `${schedule.description}\n\n[${DateUtil.format(cancelledAt, 'YYYY-MM-DD HH:mm')}] 일정이 취소되었습니다.${cancelReason ? ` 사유: ${cancelReason}` : ''}`
            //     : `[${DateUtil.format(cancelledAt, 'YYYY-MM-DD HH:mm')}] 일정이 취소되었습니다.${cancelReason ? ` 사유: ${cancelReason}` : ''}`;

            await this.domainScheduleService.softDelete(schedule.scheduleId, { queryRunner });

            if (shouldManageTransaction) {
                await queryRunner.commitTransaction();
            }

            return true;
        } catch (error) {
            if (shouldManageTransaction) {
                await queryRunner.rollbackTransaction();
            }
            return false;
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
    ): Promise<boolean> {
        const shouldManageTransaction = !queryRunner;
        if (shouldManageTransaction) {
            queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
        }

        try {
            const completedAt = new Date();

            // 현재 시간을 30분 단위로 올림하여 새로운 종료시간 계산
            const newEndTime = new Date(completedAt);
            const minutes = newEndTime.getMinutes();

            if (minutes === 0) {
                // 정각이면 그대로 유지
                newEndTime.setSeconds(0, 0);
            } else if (minutes <= 30) {
                // 1~30분이면 30분으로 설정
                newEndTime.setMinutes(30, 0, 0);
            } else {
                // 31~59분이면 다음 시간 0분으로 설정
                newEndTime.setHours(newEndTime.getHours() + 1, 0, 0, 0);
            }

            // 기존 종료시간보다 이른 경우에만 종료시간 수정
            const shouldUpdateEndTime = newEndTime < schedule.endDate;
            const actualEndTime = shouldUpdateEndTime ? newEndTime : schedule.endDate;

            if (reservation && shouldUpdateEndTime) {
                // 예약의 종료시간도 함께 수정
                await this.domainReservationService.update(
                    reservation.reservationId,
                    {
                        status: ReservationStatus.CLOSED,
                        endDate: actualEndTime,
                    },
                    { queryRunner },
                );

                reservation = await this.domainReservationService.findOne({
                    where: { reservationId: reservation.reservationId },
                });
            } else if (reservation) {
                await this.domainReservationService.update(
                    reservation.reservationId,
                    { status: ReservationStatus.CLOSED },
                    { queryRunner },
                );

                reservation = await this.domainReservationService.findOne({
                    where: { reservationId: reservation.reservationId },
                });
            }

            // // 날짜 포맷팅 헬퍼 함수 (YYYY-MM-DD HH:mm 형식)
            // const formatDateTime = (date: Date) => {
            //     return date.toISOString().slice(0, 16).replace('T', ' ');
            // };

            // const completionInfo = `[${formatDateTime(completedAt)}] 일정이 완료되었습니다.${completionNotes ? ` 완료 메모: ${completionNotes}` : ''}${shouldUpdateEndTime ? `\n원래 종료시간: ${formatDateTime(schedule.endDate)}, 수정된 종료시간: ${formatDateTime(actualEndTime)}` : ''}`;
            // const updatedDescription = schedule.description
            //     ? `${schedule.description}\n\n${completionInfo}`
            //     : completionInfo;

            await this.domainScheduleService.update(
                schedule.scheduleId,
                {
                    status: ScheduleStatus.COMPLETED,
                    // description: updatedDescription,
                    // completionReason: completionNotes,
                    // ...(shouldUpdateEndTime && { endDate: actualEndTime }),
                },
                { queryRunner },
            );

            if (shouldManageTransaction) {
                await queryRunner.commitTransaction();
            }

            const updatedSchedule = await this.domainScheduleService.findOne({
                where: { scheduleId: schedule.scheduleId },
            });
            return true;
        } catch (error) {
            if (shouldManageTransaction) {
                await queryRunner.rollbackTransaction();
            }
            return false;
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

            await this.domainScheduleService.update(schedule.scheduleId, { endDate: newEndDate }, { queryRunner });

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
