import { Injectable } from '@nestjs/common';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { FCMAdapter } from '../adapter/fcm-push.adapter';
import { LessThanOrEqual } from 'typeorm';
import { DateUtil } from '@libs/utils/date.util';
import { PushSubscriptionDto } from '@src/application/notification/dtos/push-subscription.dto';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';

@Injectable()
export class CronNotificationContextService {
    constructor(
        private readonly domainNotificationService: DomainNotificationService,
        private readonly fcmAdapter: FCMAdapter,
        private readonly domainEmployeeService: DomainEmployeeService,
    ) {}

    async 다가오는_알림을_전송한다(): Promise<void> {
        const now = DateUtil.now().format('YYYY-MM-DD HH:mm');
        const notifications = await this.domainNotificationService.findAll({
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
                const subscriptions = await this.구독_목록을_조회한다(employeeId);
                totalSubscriptions.push(...subscriptions);
            }
            if (totalSubscriptions.length === 0) {
                continue;
            }
            try {
                await this.fcmAdapter.sendBulkNotification(totalSubscriptions, {
                    title: notification.title,
                    body: notification.body,
                    notificationType: notification.notificationType,
                    notificationData: notification.notificationData,
                });
            } catch (error) {
                console.error(`Failed to send notification: ${error}`);
            } finally {
                await this.domainNotificationService.update(notification.notificationId, { isSent: true });
            }
        }
    }

    private async 구독_목록을_조회한다(employeeId: string): Promise<PushSubscriptionDto[]> {
        const employee = await this.domainEmployeeService.findOne({
            where: { employeeId },
            select: { subscriptions: true, isPushNotificationEnabled: true },
        });

        if (
            !employee ||
            !employee.subscriptions ||
            employee.subscriptions.length === 0 ||
            !employee.isPushNotificationEnabled
        ) {
            return [];
        }
        return employee.subscriptions;
    }
}
