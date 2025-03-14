import { Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeNotificationDto } from '@resource/modules/notification/application/dto/create-notification.dto';
import { EmployeeNotification } from '@libs/entities';
import { EmployeeNotificationRepository } from '../../infrastructure/adapters/out/persistence/employee-notification.repository';
import { EmployeeNotificationRepositoryPort } from '../../domain/ports/employee-notification.repository.port';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';

@Injectable()
export class EmployeeNotificationService {
    constructor(
        @Inject('EmployeeNotificationRepositoryPort')
        private readonly employeeNotificationRepository: EmployeeNotificationRepositoryPort,
    ) {}

    async save(
        createEmployeeNotificationDto: CreateEmployeeNotificationDto,
        repositoryOptions?: RepositoryOptions,
    ): Promise<EmployeeNotification> {
        return await this.employeeNotificationRepository.save(createEmployeeNotificationDto, repositoryOptions);
    }

    async findOne(repositoryOptions?: RepositoryOptions): Promise<EmployeeNotification> {
        return await this.employeeNotificationRepository.findOne(repositoryOptions);
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<EmployeeNotification[]> {
        return await this.employeeNotificationRepository.findAll(repositoryOptions);
    }

    async update(
        employeeNotificationId: string,
        updateEmployeeNotificationDto: Partial<EmployeeNotification>,
        repositoryOptions?: RepositoryOptions,
    ): Promise<EmployeeNotification> {
        return await this.employeeNotificationRepository.update(
            employeeNotificationId,
            updateEmployeeNotificationDto,
            repositoryOptions,
        );
    }
}
