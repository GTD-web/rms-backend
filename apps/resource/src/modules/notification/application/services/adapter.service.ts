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
import { UserService } from '@resource/modules/auth/application/services/user.service';
import { Not, IsNull } from 'typeorm';

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
        private readonly userService: UserService,
    ) {}

    async send(): Promise<void> {
        const usersWithSubscription = await this.userService.findAll({
            where: {
                subscription: Not(IsNull()),
            },
        });
        console.log('send');
        const subscriptions = usersWithSubscription.map((user) => user.subscription);
        await this.pushNotificationService.sendNotification(
            subscriptions,
            new WebPushPayload({
                title: 'test title',
                body: 'test body',
            }),
        );
    }
}
