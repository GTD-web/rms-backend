import { Injectable } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { Employee } from '@libs/entities';
import { Raw } from 'typeorm';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { ResponseNotificationDto } from '@src/application/notification/dtos/response-notification.dto';

@Injectable()
export class FindDelayedVehicleNotificationsUsecase {
    constructor(private readonly notificationService: DomainNotificationService) {}

    async execute(reservationId: string): Promise<ResponseNotificationDto[]> {
        const notifications = await this.notificationService.findAll({
            where: {
                notificationData: Raw((alias) => `${alias} ->> 'reservationId' = '${reservationId}'`),
                notificationType: NotificationType.RESOURCE_VEHICLE_DELAYED_RETURNED,
            },
        });

        return notifications;
    }
}
