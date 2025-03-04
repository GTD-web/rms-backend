import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { NotificationRepositoryPort } from "@resource/modules/notification/domain/ports/notification.repository.port";
import { Notification } from "@libs/entities/notification.entity";  

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NotificationRepositoryPort')
    private readonly notificationRepository: NotificationRepositoryPort,
  ) {}

  async findAllByEmployeeId(employeeId: string): Promise<Notification[]> {
    // return this.notificationRepository.findAllByEmployeeId(employeeId);
    return [];
  }

  async findById(id: string): Promise<Notification> {
    // return this.notificationRepository.findById(id);
    return new Notification();
  }

  async markAsRead(id: string): Promise<void> {
    // await this.notificationRepository.markAsRead(id);
  }

  async markAsUnread(id: string): Promise<void> {
    // await this.notificationRepository.markAsUnread(id);
  }

  async markAllAsRead(): Promise<void> {
    // await this.notificationRepository.markAllAsRead();
  }

  async delete(id: string): Promise<void> {
    // await this.notificationRepository.delete(id);
  }
}