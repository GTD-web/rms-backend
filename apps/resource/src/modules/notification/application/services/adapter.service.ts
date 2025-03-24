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

    async send(employeeId: string, notification: Notification): Promise<void> {
        const user = await this.userService.findByEmployeeId(employeeId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.pushNotificationService.sendNotification(user.subscription, {
            title: notification.title,
            body: notification.body,
        });
    }

    async sendTestNotification(payload) {
        await this.pushNotificationService.sendTestNotification(payload);
    }
}
