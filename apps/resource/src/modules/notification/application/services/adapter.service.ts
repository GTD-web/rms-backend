import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepositoryPort } from '@resource/modules/notification/domain/ports/notification.repository.port';
import { PushNotificationPort } from '@resource/modules/notification/domain/ports/push-notification.port';
import { Notification } from '@libs/entities/notification.entity';
import { UserService } from '@resource/modules/auth/application/services/user.service';
import { Not, IsNull } from 'typeorm';

@Injectable()
export class AdapterService {
    constructor(
        @Inject('NotificationRepositoryPort')
        private readonly notificationRepository: NotificationRepositoryPort,
        @Inject('PushNotificationServicePort')
        private readonly pushNotificationService: PushNotificationPort,
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
        await Promise.all(
            subscriptions.map(async (subscription) => {
                await this.pushNotificationService.sendNotification(subscription, {
                    title: 'test title',
                    body: 'test body',
                });
            }),
        );
    }
}
