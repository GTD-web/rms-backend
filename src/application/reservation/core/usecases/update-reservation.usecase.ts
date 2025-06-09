import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ReservationResponseDto, ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { ParticipantsType, ReservationStatus } from '@libs/enums/reservation-type.enum';
import { UpdateReservationDto } from '../dtos/update-reservation.dto';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { In } from 'typeorm';
import { DateUtil } from '@libs/utils/date.util';
import { NotificationService } from '@src/application/notification/services/notification.service';
import { DomainReservationParticipantService } from '@src/domain/reservation-participant/reservation-participant.service';
import { FindConflictReservationUsecase } from './find-conflict-reservation.usecase';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationParticipant } from '@libs/entities/reservation-participant.entity';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { CreateReservationClosingJobUsecase } from './create-reservation-closing-job.usecase';
import { DeleteReservationClosingJobUsecase } from './delete-reservation-closing-job.usecase';

@Injectable()
export class UpdateReservationUsecase {
    constructor(
        private readonly reservationService: DomainReservationService,
        private readonly participantService: DomainReservationParticipantService,
        private readonly notificationService: NotificationService,
        private readonly findConflictReservationUsecase: FindConflictReservationUsecase,
        private readonly createReservationClosingJob: CreateReservationClosingJobUsecase,
        private readonly deleteReservationClosingJob: DeleteReservationClosingJobUsecase,
    ) {}

    async execute(reservationId: string, updateDto: UpdateReservationDto): Promise<ReservationResponseDto> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId, status: In([ReservationStatus.PENDING, ReservationStatus.CONFIRMED]) },
            relations: ['resource', 'participants'],
            withDeleted: true,
        });
        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }
        if (reservation.status === ReservationStatus.CLOSED) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_UPDATE_STATUS(reservation.status));
        }

        let hasUpdateTime = false;
        let hasUpdateParticipants = false;
        // 참가자 변경 여부 확인
        if (updateDto.participantIds) {
            // 참가자 변경 여부 확인 => 배열길이 확인, 배열 요소 비교
            hasUpdateParticipants =
                updateDto.participantIds.length !==
                    reservation.participants.filter((p) => p.type === ParticipantsType.PARTICIPANT).length ||
                updateDto.participantIds.some((id) => !reservation.participants.some((p) => p.employeeId === id));
        }

        if (updateDto.resourceId && updateDto.startDate && updateDto.endDate) {
            hasUpdateTime = true;
            const conflicts = await this.findConflictReservationUsecase.execute(
                updateDto.resourceId,
                DateUtil.date(updateDto.startDate).toDate(),
                DateUtil.date(updateDto.endDate).toDate(),
                reservationId,
            );
            if (conflicts.length > 0) {
                throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.TIME_CONFLICT);
            }

            if (
                reservation.status === ReservationStatus.CONFIRMED &&
                reservation.resource.type === ResourceType.ACCOMMODATION
            ) {
                throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_UPDATE_ACCOMMODATION_TIME);
            }
        }
        const participantIds = updateDto.participantIds;
        delete updateDto.participantIds;
        let updatedReservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['participants', 'resource'],
            withDeleted: true,
        });

        const hasUpdateTings =
            updateDto.title || updateDto.isAllDay || updateDto.notifyBeforeStart || updateDto.notifyMinutesBeforeStart;

        if (hasUpdateTings) {
            updatedReservation = await this.reservationService.update(
                reservationId,
                {
                    title: updateDto?.title || undefined,
                    isAllDay: updateDto?.isAllDay || undefined,
                    notifyBeforeStart: updateDto?.notifyBeforeStart || undefined,
                    notifyMinutesBeforeStart: updateDto?.notifyMinutesBeforeStart || undefined,
                },
                {
                    where: { reservationId },
                    relations: ['participants', 'resource'],
                    withDeleted: true,
                },
            );
        }

        if (hasUpdateParticipants) {
            // 기존 참가자 조회
            const participants = reservation.participants.filter((p) => p.type === ParticipantsType.PARTICIPANT);
            const newParticipants = participantIds.filter((id) => !participants.some((p) => p.employeeId === id));
            const deletedParticipants = participants.filter((p) => !participantIds.includes(p.employeeId));
            // 기존 참가자 삭제
            await Promise.all(
                deletedParticipants.map((participant) => this.participantService.delete(participant.participantId)),
            );

            // 새로운 참가자 저장
            await Promise.all(
                newParticipants.map((employeeId) =>
                    this.participantService.save({
                        reservationId,
                        employeeId,
                        type: ParticipantsType.PARTICIPANT,
                    } as ReservationParticipant),
                ),
            );

            if (updatedReservation.resource.notifyParticipantChange) {
                try {
                    const notiTarget = [...newParticipants, ...participants.map((p) => p.employeeId)];

                    await this.notificationService.createNotification(
                        NotificationType.RESERVATION_PARTICIPANT_CHANGED,
                        {
                            reservationId: updatedReservation.reservationId,
                            reservationTitle: updatedReservation.title,
                            reservationDate: DateUtil.toAlarmRangeString(
                                DateUtil.format(updatedReservation.startDate),
                                DateUtil.format(updatedReservation.endDate),
                            ),
                            resourceId: updatedReservation.resource.resourceId,
                            resourceName: updatedReservation.resource.name,
                            resourceType: updatedReservation.resource.type,
                        },
                        notiTarget,
                    );
                } catch (error) {
                    console.log(error);
                    console.log('Notification creation failed in updateParticipants');
                }
            }
        }

        // 상태가 CONFIRMED인 경우에만 새로운 Job 생성
        if (hasUpdateTime) {
            if (
                reservation.status === ReservationStatus.CONFIRMED &&
                reservation.resource.type !== ResourceType.VEHICLE
            ) {
                // 기존 Job 삭제
                this.deleteReservationClosingJob.execute(reservationId);
                this.createReservationClosingJob.execute(reservation);
            }
            updatedReservation = await this.reservationService.update(
                reservationId,
                {
                    startDate: updateDto.startDate ? DateUtil.date(updateDto.startDate).toDate() : undefined,
                    endDate: updateDto.endDate ? DateUtil.date(updateDto.endDate).toDate() : undefined,
                },
                {
                    where: { reservationId },
                    relations: ['participants', 'resource'],
                    withDeleted: true,
                },
            );
            if (updatedReservation.resource.notifyReservationChange) {
                try {
                    const notiTarget = updatedReservation.participants.map((participant) => participant.employeeId);

                    await this.notificationService.createNotification(
                        NotificationType.RESERVATION_TIME_CHANGED,
                        {
                            reservationId: updatedReservation.reservationId,
                            reservationTitle: updatedReservation.title,
                            reservationDate: DateUtil.toAlarmRangeString(
                                DateUtil.format(updatedReservation.startDate),
                                DateUtil.format(updatedReservation.endDate),
                            ),
                            resourceId: updatedReservation.resource.resourceId,
                            resourceName: updatedReservation.resource.name,
                            resourceType: updatedReservation.resource.type,
                        },
                        notiTarget,
                    );

                    for (const beforeMinutes of updatedReservation.notifyMinutesBeforeStart) {
                        await this.notificationService.createNotification(
                            NotificationType.RESERVATION_DATE_UPCOMING,
                            {
                                reservationId: updatedReservation.reservationId,
                                reservationTitle: updatedReservation.title,
                                resourceId: updatedReservation.resource.resourceId,
                                resourceName: updatedReservation.resource.name,
                                resourceType: updatedReservation.resource.type,
                                reservationDate: DateUtil.format(updatedReservation.startDate),
                                beforeMinutes: beforeMinutes,
                            },
                            notiTarget,
                        );
                    }
                } catch (error) {
                    console.log(error);
                    console.log('Notification creation failed in updateTime');
                }
            }
        }

        return new ReservationResponseDto(updatedReservation);
    }
}
