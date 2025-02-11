import { Injectable } from '@nestjs/common';
import { INotificationService } from '../../domain/interfaces/notification.interface';
import { NotificationRepository } from '../../infrastructure/repositories/notification.repository';
import { WebPushAdapter } from '../../infrastructure/adapters/web-push.adapter';
import { PushSubscriptionRepository } from '../../infrastructure/repositories/push-subscription.repository';

@Injectable()
export class NotificationService implements INotificationService {
    constructor(
        private readonly notificationRepository: NotificationRepository,
        private readonly pushSubscriptionRepository: PushSubscriptionRepository,
        private readonly webPushAdapter: WebPushAdapter,
    ) {}

    async send(notification: Partial<INotification>): Promise<void> {
        // 알림 저장
        const savedNotification = await this.notificationRepository.create(notification);

        // 사용자의 푸시 구독 정보 조회
        const subscriptions = await this.pushSubscriptionRepository.findByUserId(notification.userId);

        // 각 구독에 대해 푸시 알림 전송
        const pushPayload = JSON.stringify({
            title: notification.title,
            body: notification.body,
            data: notification.data,
        });

        await Promise.all(
            subscriptions.map((sub) => this.webPushAdapter.sendNotification(sub.subscription, pushPayload)),
        );
    }

    async markAsRead(notificationId: string): Promise<void> {
        await this.notificationRepository.markAsRead(notificationId);
    }

    async getUserNotifications(userId: string): Promise<INotification[]> {
        return this.notificationRepository.findByUserId(userId);
    }

    async subscribe(userId: string, subscription: PushSubscription): Promise<void> {
        await this.pushSubscriptionRepository.save(userId, subscription);
    }
}
