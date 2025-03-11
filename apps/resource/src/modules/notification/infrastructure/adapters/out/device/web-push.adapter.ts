import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PushNotificationPort } from '@resource/modules/notification/domain/ports/push-notification.port';
import * as webPush from 'web-push';
// FCM SDK import
export class WebPushSubscription {
    endpoint: string;
    keys: {
        auth: string;
        p256dh: string;
    };
}

export class WebPushPayload {
    title: string;
    body: string;

    constructor(payload: WebPushPayload) {
        this.title = payload.title;
        this.body = payload.body;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}

export class WebPushSendResult {
    success: boolean;
    message: string;
    error: string;

    constructor(success: boolean, message: string, error: string) {
        this.success = success;
        this.message = message;
        this.error = error;
    }
}

@Injectable()
export class WebPushAdapter implements PushNotificationPort<WebPushSubscription, WebPushPayload, WebPushSendResult> {
    constructor(private readonly configService: ConfigService) {
        webPush.setVapidDetails(
            'mailto:test@test.com',
            this.configService.get('webPush.publicKey'),
            this.configService.get('webPush.privateKey'),
        );
    }

    async initialize(): Promise<void> {}

    async sendNotification(
        subscriptions: WebPushSubscription | WebPushSubscription[],
        payload: WebPushPayload,
    ): Promise<WebPushSendResult> {
        const subscriptionArray = Array.isArray(subscriptions) ? subscriptions : [subscriptions];
        const sendResults = await Promise.all(
            subscriptionArray.map(async (subscription) => {
                const result = await webPush.sendNotification(subscription, payload.toString());
                return result;
            }),
        );

        console.log('sendResults', sendResults);

        return new WebPushSendResult(true, 'success', 'success');
    }

    validateSubscription(subscription: WebPushSubscription): boolean {
        return true;
    }
}
