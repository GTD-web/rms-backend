import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
    PushNotificationPort,
    PushNotificationSubscription,
} from '@resource/modules/notification/domain/ports/push-notification.port';
import { Notification } from '@libs/entities/notification.entity';
import { User } from '@libs/entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AdapterService {
    constructor(
        @Inject('PushNotificationServicePort')
        private readonly pushNotificationService: PushNotificationPort,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async send(employeeId: string, notification: Notification): Promise<void> {
        const [subscription] = await this.eventEmitter.emitAsync('find.user.subscription', {
            employeeId,
        });

        if (!subscription) {
            throw new NotFoundException('Subscription not found');
        }

        await this.pushNotificationService.bulkSendNotification(subscription as PushNotificationSubscription[], {
            title: notification.title,
            body: notification.body,
        });
    }

    async sendTestNotification(user: User, payload: any) {
        const [subscription] = await this.eventEmitter.emitAsync('find.user.subscription', {
            employeeId: user.employeeId,
        });
        await this.pushNotificationService.sendTestNotification(subscription, payload);
    }
}
