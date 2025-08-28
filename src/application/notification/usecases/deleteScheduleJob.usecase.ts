import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Notification } from '@libs/entities';
import { CreateNotificationDataDto } from '../dtos/create-notification.dto';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { Raw } from 'typeorm';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';
import { DomainNotificationService } from '@src/domain/notification/notification.service';

@Injectable()
export class DeleteScheduleJobUsecase {
    constructor(
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly notificationService: DomainNotificationService,
        private readonly employeeNotificationService: DomainEmployeeNotificationService,
    ) {}

    async execute(reservationId: string) {
        const notifications = await this.notificationService.findAll({
            where: {
                notificationType: NotificationType.RESERVATION_DATE_UPCOMING,
                notificationData: Raw((alias) => `${alias} -> 'reservation' ->> 'reservationId' = '${reservationId}'`),
                isSent: false,
            },
        });
        for (const notification of notifications) {
            await this.employeeNotificationService.deleteByNotificationId(notification.notificationId);
            await this.notificationService.delete(notification.notificationId);
        }
    }
}
