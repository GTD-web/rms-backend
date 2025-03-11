import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepositoryPort } from '@resource/modules/notification/domain/ports/notification.repository.port';
import { PushNotificationPort } from '@resource/modules/notification/domain/ports/push-notification.port';
import { Notification } from '@libs/entities/notification.entity';
import { PushSubscription } from 'web-push';
import {
    WebPushSubscription,
    WebPushPayload,
    WebPushSendResult,
} from '@resource/modules/notification/infrastructure/adapters/out/device/web-push.adapter';

@Injectable()
export class AdapterService {
    constructor(
        @Inject('NotificationRepositoryPort')
        private readonly notificationRepository: NotificationRepositoryPort,
        @Inject('PushNotificationServicePort')
        private readonly pushNotificationService: PushNotificationPort<
            WebPushSubscription,
            WebPushPayload,
            WebPushSendResult
        >,
    ) {}

    async subscribe(subscription: WebPushSubscription): Promise<void> {
        console.log('subscription', subscription);
    }

    async unsubscribe(userId: string, subscription: PushSubscription): Promise<void> {
        // await this.notificationRepository.unsubscribe(userId, subscription);
    }

    async send(subscription: WebPushSubscription): Promise<void> {
        console.log('send', subscription);
        await this.pushNotificationService.sendNotification(
            [subscription],
            new WebPushPayload({
                title: 'test title',
                body: 'test body',
            }),
        );
    }

    async resend(id: string): Promise<void> {
        // await this.notificationRepository.resend(id);
    }
}
