import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    PushNotificationPort,
    PushNotificationSubscription,
    PushNotificationPayload,
    PushNotificationSendResult,
} from '@resource/modules/notification/domain/ports/push-notification.port';
import * as webPush from 'web-push';

@Injectable()
export class WebPushAdapter implements PushNotificationPort {
    constructor(private readonly configService: ConfigService) {
        webPush.setVapidDetails(
            'mailto:test@test.com',
            this.configService.get('webPush.publicKey'),
            this.configService.get('webPush.privateKey'),
        );
    }

    async sendNotification(
        subscription: PushNotificationSubscription,
        payload: PushNotificationPayload,
    ): Promise<PushNotificationSendResult> {
        const result = await webPush.sendNotification(subscription.webPush, JSON.stringify(payload));
        console.log(result);
        return {
            success: true,
            message: 'success',
            error: 'success',
        };
    }
}
