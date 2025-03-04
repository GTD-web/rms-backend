import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { Notification } from '@libs/entities/notification.entity';

export interface NotificationRepositoryPort {
  save(notification: Notification, options?: RepositoryOptions<Notification>): Promise<Notification>;
  findById(notificationId: string, options?: RepositoryOptions<Notification>): Promise<Notification | null>;
  findByEmployeeId(employeeId: string, options?: RepositoryOptions<Notification>): Promise<Notification[]>;
  update(notification: Notification, options?: RepositoryOptions<Notification>): Promise<Notification>;
  delete(notificationId: string, options?: RepositoryOptions<Notification>): Promise<void>;

  markAsRead(notificationId: string, options?: RepositoryOptions<Notification>): Promise<void>;
  markAllAsRead(employeeId: string, options?: RepositoryOptions<Notification>): Promise<void>;
}