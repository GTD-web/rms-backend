import { EmployeeNotification } from '@libs/entities';
import { CreateEmployeeNotificationDto } from '@resource/modules/notification/application/dto/create-notification.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface EmployeeNotificationRepositoryPort {
    save(
        createEmployeeNotificationDto: CreateEmployeeNotificationDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<EmployeeNotification>;
}
