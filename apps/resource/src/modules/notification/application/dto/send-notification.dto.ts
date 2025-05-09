import { ApiProperty } from '@nestjs/swagger';
import { PushSubscriptionDto } from './push-subscription.dto';

export class PushNotificationPayload {
    @ApiProperty()
    title: string;

    @ApiProperty()
    body: string;
}

export class PushNotificationDto {
    @ApiProperty({ type: PushNotificationPayload })
    payload: PushNotificationPayload;

    @ApiProperty({ type: PushSubscriptionDto })
    subscription: PushSubscriptionDto;
}
