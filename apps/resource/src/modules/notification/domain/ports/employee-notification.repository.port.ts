import { EmployeeNotification } from '@libs/entities';
import { CreateEmployeeNotificationDto } from '@resource/modules/notification/application/dto/create-notification.dto';

export interface EmployeeNotificationRepositoryPort {
    save(createEmployeeNotificationDto: CreateEmployeeNotificationDto): Promise<EmployeeNotification>;
}
