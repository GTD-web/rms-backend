import { Injectable, NotFoundException } from '@nestjs/common';
import { AdapterService } from '../services/adapter.service';
import { NotificationService } from '../services/notification.service';
import { WebPushSubscription } from '../../infrastructure/adapters/out/device/web-push.adapter';
import { User } from '@libs/entities';
import { UserService } from '@resource/modules/auth/application/services/user.service';
@Injectable()
export class NotificationUsecase {
    constructor(
        private readonly adapterService: AdapterService,
        private readonly notificationService: NotificationService,
        private readonly userService: UserService,
    ) {}

    async subscribe(user: User, subscription: WebPushSubscription): Promise<void> {
        const userDomain = await this.userService.findByUserId(user.userId);
        userDomain.updateSubscription(subscription);
        await this.userService.update(userDomain);
    }

    async unsubscribe(user: User): Promise<void> {
        const userDomain = await this.userService.findByUserId(user.userId);
        userDomain.updateSubscription(null);
        await this.userService.update(userDomain);
    }
}
