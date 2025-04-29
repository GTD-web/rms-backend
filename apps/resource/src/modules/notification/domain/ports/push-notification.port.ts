import { User } from '@libs/entities/user.entity';

export interface FCM {
    token: string;
}

export interface WebPush {
    endpoint: string;
    keys: {
        auth: string;
        p256dh: string;
    };
}

export interface PushNotificationSubscription {
    fcm: FCM | null;
    webPush: WebPush | null;
}

export interface PushNotificationPayload {
    title: string;
    body: string;
}

export interface PushNotificationSendResult {
    success: boolean;
    message: any;
    error: string;
}

export interface PushNotificationPort {
    sendNotification(
        subscription: PushNotificationSubscription,
        payload: PushNotificationPayload,
    ): Promise<PushNotificationSendResult>;
    bulkSendNotification(
        subscriptions: PushNotificationSubscription[],
        payload: PushNotificationPayload,
    ): Promise<PushNotificationSendResult>;

    sendTestNotification(subscription: PushNotificationSubscription, payload: any): Promise<any>;
}
