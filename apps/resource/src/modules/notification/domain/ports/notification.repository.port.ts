import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { Notification } from '@libs/entities/notification.entity';
import { CreateNotificationDto } from '@resource/modules/notification/application/dto/create-notification.dto';
export interface NotificationRepositoryPort {
    save(
        createNotificationDto: CreateNotificationDto,
        options?: RepositoryOptions<Notification>,
    ): Promise<Notification>;
    findOne(options?: RepositoryOptions<Notification>): Promise<Notification | null>;
    findAll(options?: RepositoryOptions<Notification>): Promise<Notification[]>;
    update(
        notificationId: string,
        updateNotificationDto: Partial<Notification>,
        options?: RepositoryOptions<Notification>,
    ): Promise<Notification>;
    delete(notificationId: string, options?: RepositoryOptions<Notification>): Promise<void>;
    count(options?: RepositoryOptions<Notification>): Promise<number>;

    // markAsRead(notificationId: string, options?: RepositoryOptions<Notification>): Promise<void>;
    // markAllAsRead(employeeId: string, options?: RepositoryOptions<Notification>): Promise<void>;
}
