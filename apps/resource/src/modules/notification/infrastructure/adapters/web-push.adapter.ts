import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as webPush from 'web-push';
import { INotificationProvider } from '../interfaces/notification-provider.interface';

@Injectable()
export class WebPushAdapter implements INotificationProvider {
    constructor(private readonly configService: ConfigService) {
        webPush.setVapidDetails(
            'mailto:' + this.configService.get('VAPID_MAILTO'),
            this.configService.get('VAPID_PUBLIC_KEY'),
            this.configService.get('VAPID_PRIVATE_KEY'),
        );
    }

    async sendNotification(subscription: PushSubscription, payload: string): Promise<void> {
        try {
            await webPush.sendNotification(subscription, payload);
        } catch (error) {
            // 구독이 만료되었거나 오류가 발생한 경우 처리
            throw new Error('Failed to send push notification');
        }
    }
}
