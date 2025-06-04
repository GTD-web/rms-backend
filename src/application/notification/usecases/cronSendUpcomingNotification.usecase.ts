import { Injectable } from '@nestjs/common';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { LessThanOrEqual, Not, In } from 'typeorm';
import { DateUtil } from '@libs/utils/date.util';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { FCMAdapter } from '../infrastructure/fcm-push.adapter';
import { PushSubscriptionDto } from '../dtos/push-subscription.dto';
import { GetSubscriptionsUsecase } from './getSubscriptions.usecase';

@Injectable()
export class CronSendUpcomingNotificationUsecase {
    constructor(
        private readonly notificationService: DomainNotificationService,
        private readonly FCMAdapter: FCMAdapter,
        private readonly getSubscriptionsUsecase: GetSubscriptionsUsecase,
    ) {}

    async execute(): Promise<void> {
        const now = DateUtil.now().format('YYYY-MM-DD HH:mm');
        const notifications = await this.notificationService.findAll({
            where: {
                isSent: false,
                createdAt: LessThanOrEqual(now),
            },
            relations: ['employees'],
        });

        for (const notification of notifications) {
            const notiTarget = notification.employees.map((employee) => employee.employeeId);

            const totalSubscriptions: PushSubscriptionDto[] = [];
            for (const employeeId of notiTarget) {
                const subscriptions = await this.getSubscriptionsUsecase.execute(employeeId);
                totalSubscriptions.push(...subscriptions);
            }
            try {
                await this.FCMAdapter.sendBulkNotification(totalSubscriptions, {
                    title: notification.title,
                    body: notification.body,
                });
            } catch (error) {
                console.error(`Failed to send notification: ${error}`);
            } finally {
                await this.notificationService.update(notification.notificationId, { isSent: true });
            }
        }
    }
}
