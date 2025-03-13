import { ApiProperty } from '@nestjs/swagger';
import {
    FCM,
    WebPush,
    PushNotificationSubscription,
} from '@resource/modules/notification/domain/ports/push-notification.port';

export class FCMDto implements FCM {
    @ApiProperty()
    token: string;
}

export class WebPushDto implements WebPush {
    @ApiProperty()
    endpoint: string;

    @ApiProperty()
    keys: {
        p256dh: string;
        auth: string;
    };
}

export class PushSubscriptionDto implements PushNotificationSubscription {
    @ApiProperty({ type: FCMDto })
    fcm: FCMDto;

    @ApiProperty({ type: WebPushDto })
    webPush: WebPushDto;
}
