interface FCM {
    token: string;
}

interface WebPush {
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
    message: string;
    error: string;
}

export interface PushNotificationPort {
    sendNotification(
        subscription: PushNotificationSubscription,
        payload: PushNotificationPayload,
    ): Promise<PushNotificationSendResult>;
}
