import { EmployeeNotification } from '@libs/entities';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeNotificationDto } from '@resource/modules/notification/application/dto/create-notification.dto';
import { EmployeeNotificationRepositoryPort } from '@resource/modules/notification/domain/ports/employee-notification.repository.port';
import { Repository } from 'typeorm';

export class EmployeeNotificationRepository implements EmployeeNotificationRepositoryPort {
    constructor(
        @InjectRepository(EmployeeNotification)
        private readonly repository: Repository<EmployeeNotification>,
    ) {}

    async save(
        createEmployeeNotificationDto: CreateEmployeeNotificationDto,
        repositoryOptions?: RepositoryOptions<EmployeeNotification>,
    ): Promise<EmployeeNotification> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(EmployeeNotification)
            : this.repository;
        return await repository.save(createEmployeeNotificationDto);
    }
}
