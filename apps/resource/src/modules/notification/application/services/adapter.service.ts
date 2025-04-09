import { Inject, Injectable } from '@nestjs/common';
import { PushNotificationPort } from '@resource/modules/notification/domain/ports/push-notification.port';
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

        await this.pushNotificationService.sendNotification(subscription, {
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
