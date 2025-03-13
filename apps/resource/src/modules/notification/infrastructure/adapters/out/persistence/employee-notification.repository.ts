import { EmployeeNotification } from '@libs/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeNotificationDto } from '@resource/modules/notification/application/dto/create-notification.dto';
import { EmployeeNotificationRepositoryPort } from '@resource/modules/notification/domain/ports/employee-notification.repository.port';
import { Repository } from 'typeorm';

export class EmployeeNotificationRepository implements EmployeeNotificationRepositoryPort {
    constructor(
        @InjectRepository(EmployeeNotification)
        private readonly repository: Repository<EmployeeNotification>,
    ) {}

    async save(createEmployeeNotificationDto: CreateEmployeeNotificationDto): Promise<EmployeeNotification> {
        return await this.repository.save(createEmployeeNotificationDto);
    }
}
