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

    @ApiProperty({
        type: 'object',
        properties: {
            auth: { type: 'string' },
            p256dh: { type: 'string' },
        },
    })
    keys: {
        auth: string;
        p256dh: string;
    };
}

export class PushSubscriptionDto implements PushNotificationSubscription {
    @ApiProperty({ type: FCMDto, required: false })
    fcm: FCMDto;

    @ApiProperty({ type: WebPushDto, required: false })
    webPush: WebPushDto;
}
