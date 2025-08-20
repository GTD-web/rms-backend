import { ApiProperty } from '@nestjs/swagger';

export class FCMDto {
    @ApiProperty()
    token: string;
}

export class WebPushDto {
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

export class PushSubscriptionDto {
    @ApiProperty({ type: FCMDto, required: false })
    fcm: FCMDto;

    @ApiProperty({ type: WebPushDto, required: false })
    webPush: WebPushDto;
}
