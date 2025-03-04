import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PushNotificationPort } from '@resource/modules/notification/domain/ports/push-notification.port';
import { AdapterService } from '@resource/modules/notification/application/services/adapter.service';
// FCM SDK import
class FCMSubscription {}

class FCMPayload {}

class FCMSendResult {}

@Injectable()
export class FCMAdapter implements PushNotificationPort<FCMSubscription, FCMPayload, FCMSendResult> {
    constructor(
        private readonly configService: ConfigService,
        private readonly adapterService: AdapterService,
        
    ) {}
  async initialize(): Promise<void> {
   
  }

  async sendNotification(
    subscriptions: FCMSubscription | FCMSubscription[],
    payload: FCMPayload
  ): Promise<FCMSendResult> {
    return new FCMSendResult();
  }

  validateSubscription(subscription: FCMSubscription): boolean {
    return true;
  }
}