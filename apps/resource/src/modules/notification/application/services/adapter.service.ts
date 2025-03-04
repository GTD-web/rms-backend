import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { NotificationRepositoryPort } from "@resource/modules/notification/domain/ports/notification.repository.port";

@Injectable()
export class AdapterService {
  constructor(
    @Inject('NotificationRepositoryPort')
    private readonly notificationRepository: NotificationRepositoryPort,
  ) {}

  async subscribe(userId: string, subscription: PushSubscription): Promise<void> {
    // await this.notificationRepository.subscribe(userId, subscription);
  }

  async unsubscribe(userId: string, subscription: PushSubscription): Promise<void> {
    // await this.notificationRepository.unsubscribe(userId, subscription);
  }

  async send(notification: Notification): Promise<void> {
    // await this.notificationRepository.send(notification);
  }

  async resend(id: string): Promise<void> {
    // await this.notificationRepository.resend(id);
  }

}