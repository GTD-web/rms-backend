import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { UpdateReservationStatusDto } from '../dtos/update-reservation.dto';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { DateUtil } from '@libs/utils/date.util';
import { NotificationService } from '@src/application/notification/notification.service';
import { DomainReservationParticipantService } from '@src/domain/reservation-participant/reservation-participant.service';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { ReservationResponseDto } from '../dtos/reservation-response.dto';
import { CreateReservationClosingJobUsecase } from './create-reservation-closing-job.usecase';
import { DeleteReservationClosingJobUsecase } from './delete-reservation-closing-job.usecase';

@Injectable()
export class UpdateReservationStatusUsecase {
    constructor(
        private readonly reservationService: DomainReservationService,
        private readonly participantService: DomainReservationParticipantService,
        private readonly notificationService: NotificationService,
        private readonly createReservationClosingJob: CreateReservationClosingJobUsecase,
        private readonly deleteReservationClosingJob: DeleteReservationClosingJobUsecase,
    ) {}

    async execute(reservationId: string, updateDto: UpdateReservationStatusDto): Promise<ReservationResponseDto> {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['resource', 'resource.resourceManagers'],
            withDeleted: true,
        });
        if (!reservation) {
            throw new NotFoundException(ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }

        if (reservation.status === ReservationStatus.CLOSED) {
            throw new BadRequestException(ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_UPDATE_STATUS(reservation.status));
        }

        const updatedReservation = await this.reservationService.update(reservationId, updateDto);

        // 상태가 CANCELLED 또는 REJECTED인 경우 Job 삭제
        if (updateDto.status === ReservationStatus.CANCELLED || updateDto.status === ReservationStatus.REJECTED) {
            this.deleteReservationClosingJob.execute(reservationId);
        }
        // 상태가 CONFIRMED로 변경된 경우 새로운 Job 생성
        if (updateDto.status === ReservationStatus.CONFIRMED) {
            this.createReservationClosingJob.execute(updatedReservation);
        }

        if (reservation.resource.notifyReservationChange && updateDto.status !== ReservationStatus.CLOSED) {
            try {
                const reservers = await this.participantService.findAll({
                    where: { reservationId },
                });
                const notiTarget = [
                    ...reservation.resource.resourceManagers.map((manager) => manager.employeeId),
                    ...reservers.map((reserver) => reserver.employeeId),
                ];

                let notificationType: NotificationType;
                switch (updateDto.status) {
                    case ReservationStatus.CONFIRMED:
                        notificationType = NotificationType.RESERVATION_STATUS_CONFIRMED;
                        break;
                    case ReservationStatus.CANCELLED:
                        notificationType = NotificationType.RESERVATION_STATUS_CANCELLED;
                        break;
                    case ReservationStatus.REJECTED:
                        notificationType = NotificationType.RESERVATION_STATUS_REJECTED;
                        break;
                }

                this.notificationService.createNotification(
                    notificationType,
                    {
                        reservationId: reservation.reservationId,
                        reservationTitle: reservation.title,
                        reservationDate: DateUtil.toAlarmRangeString(
                            DateUtil.format(reservation.startDate),
                            DateUtil.format(reservation.endDate),
                        ),
                        resourceId: reservation.resource.resourceId,
                        resourceName: reservation.resource.name,
                        resourceType: reservation.resource.type,
                    },
                    notiTarget,
                );
            } catch (error) {
                console.log(error);
                console.log('Notification creation failed in updateStatus');
            }
        }

        return new ReservationResponseDto(updatedReservation);
    }
}
