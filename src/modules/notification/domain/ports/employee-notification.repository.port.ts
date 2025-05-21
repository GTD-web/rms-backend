import { EmployeeNotification } from '@libs/entities';
import { CreateEmployeeNotificationDto } from '@resource/modules/notification/application/dto/create-notification.dto';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

export interface EmployeeNotificationRepositoryPort {
    save(
        createEmployeeNotificationDto: CreateEmployeeNotificationDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<EmployeeNotification>;
    findOne(repositoryOptions?: RepositoryOptions): Promise<EmployeeNotification>;
    findAll(repositoryOptions?: RepositoryOptions): Promise<EmployeeNotification[]>;
    update(
        employeeNotificationId: string,
        updateEmployeeNotificationDto: Partial<EmployeeNotification>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<EmployeeNotification>;
    delete(employeeNotificationId: string, repositoryOptions?: RepositoryOptions): Promise<void>;
    deleteByNotificationId(notificationId: string, repositoryOptions?: RepositoryOptions): Promise<void>;
}
