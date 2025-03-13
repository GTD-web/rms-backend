import { Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeNotificationDto } from '@resource/modules/notification/application/dto/create-notification.dto';
import { EmployeeNotification } from '@libs/entities';
import { EmployeeNotificationRepository } from '../../infrastructure/adapters/out/persistence/employee-notification.repository';
import { EmployeeNotificationRepositoryPort } from '../../domain/ports/employee-notification.repository.port';

@Injectable()
export class EmployeeNotificationService {
    constructor(
        @Inject('EmployeeNotificationRepositoryPort')
        private readonly employeeNotificationRepository: EmployeeNotificationRepositoryPort,
    ) {}

    async save(createEmployeeNotificationDto: CreateEmployeeNotificationDto): Promise<EmployeeNotification> {
        return await this.employeeNotificationRepository.save(createEmployeeNotificationDto);
    }
}
