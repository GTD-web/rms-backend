import { Injectable, NotFoundException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron/dist';
import { Notification } from '@libs/entities';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { FCMAdapter } from '../infrastructure/fcm-push.adapter';
import { PushSubscriptionDto } from '../dtos/push-subscription.dto';

@Injectable()
export class CreateScheduleJobUsecase {
    constructor(
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly notificationService: DomainNotificationService,
        private readonly FCMAdapter: FCMAdapter,
    ) {}

    async execute(notification: Notification, subscriptions: PushSubscriptionDto[]): Promise<void> {
        const jobName = `upcoming-${notification.notificationId}`;
        const notificationDate = new Date(notification.createdAt);

        // 과거 시간 체크
        if (notificationDate.getTime() <= Date.now()) {
            console.log(`Notification time ${notificationDate} is in the past, skipping cron job creation`);
            return;
        }

        const job = new CronJob(notificationDate, async () => {
            try {
                await this.FCMAdapter.sendBulkNotification(subscriptions, {
                    title: notification.title,
                    body: notification.body,
                    notificationType: notification.notificationType,
                    notificationData: notification.notificationData,
                });
            } catch (error) {
                console.error(`Failed to send notification: ${error}`);
            } finally {
                await this.notificationService.update(notification.notificationId, { isSent: true });
            }
        });

        this.schedulerRegistry.addCronJob(jobName, job as any);
        console.log(Array.from(this.schedulerRegistry.getCronJobs().keys()));
        job.start();
    }
}
