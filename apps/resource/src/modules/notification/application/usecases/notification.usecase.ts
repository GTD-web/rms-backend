import { Injectable, NotFoundException } from '@nestjs/common';
import { AdapterService } from '../services/adapter.service';
import { NotificationService } from '../services/notification.service';
import { User } from '@libs/entities';
import { UserService } from '@resource/modules/auth/application/services/user.service';
import {
    PushNotificationSubscription,
    PushNotificationPayload,
    PushNotificationSendResult,
} from '@resource/modules/notification/domain/ports/push-notification.port';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class NotificationUsecase {
    constructor(
        private readonly adapterService: AdapterService,
        private readonly notificationService: NotificationService,
        private readonly userService: UserService,
    ) {}

    async subscribe(user: User, subscription: PushNotificationSubscription): Promise<void> {
        const userDomain = await this.userService.findByUserId(user.userId);
        userDomain.updateSubscription(subscription);
        await this.userService.update(userDomain);
    }

    async unsubscribe(user: User): Promise<void> {
        const userDomain = await this.userService.findByUserId(user.userId);
        userDomain.updateSubscription(null);
        await this.userService.update(userDomain);
    }

    // @Cron(CronExpression.EVERY_MINUTE)
    // async handleCron() {
    //     console.log('Cron job executed');
    //     await this.adapterService.send();
    //     console.log('Cron job finished');
    // }
}
