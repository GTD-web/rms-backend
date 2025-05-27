import { ERROR_MESSAGE } from '@libs/constants/error-message';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FCMAdapter } from '@src/application/notification/infrastructure/fcm-push.adapter';
import { PushSubscriptionDto } from '../dtos/push-subscription.dto';
import { PushNotificationPayload } from '../dtos/send-notification.dto';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class SendMultiNotificationUsecase {
    constructor(private readonly FCMAdapter: FCMAdapter) {}

    async execute(subscriptions: PushSubscriptionDto[], payload: PushNotificationPayload): Promise<BatchResponse> {
        return await this.FCMAdapter.sendBulkNotification(subscriptions, payload);
    }
}
