import { Injectable } from '@nestjs/common';
import { PushNotificationPort } from '@resource/modules/notification/domain/ports/push-notification.port';
// FCM SDK import
class WebPushSubscription {}

class WebPushPayload {}

class WebPushSendResult {}

@Injectable()
export class WebPushAdapter implements PushNotificationPort<WebPushSubscription, WebPushPayload, WebPushSendResult> {
  async initialize(): Promise<void> {
   
  }

  async sendNotification(
    subscriptions: WebPushSubscription | WebPushSubscription[],
    payload: WebPushPayload
  ): Promise<WebPushSendResult> {
    return new WebPushSendResult();
  }

  validateSubscription(subscription: WebPushSubscription): boolean {
    return true;
  }
}