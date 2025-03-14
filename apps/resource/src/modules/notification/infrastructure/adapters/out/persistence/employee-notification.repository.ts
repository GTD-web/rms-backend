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

    async findOne(repositoryOptions?: RepositoryOptions): Promise<EmployeeNotification> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(EmployeeNotification)
            : this.repository;
        return await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
        });
    }

    async findAll(repositoryOptions?: RepositoryOptions): Promise<EmployeeNotification[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(EmployeeNotification)
            : this.repository;
        return await repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
        });
    }

    async update(
        employeeNotificationId: string,
        updateEmployeeNotificationDto: Partial<EmployeeNotification>,
        repositoryOptions?: RepositoryOptions<EmployeeNotification>,
    ): Promise<EmployeeNotification> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(EmployeeNotification)
            : this.repository;
        const result = await repository.update(employeeNotificationId, updateEmployeeNotificationDto);
        return await repository.findOne({ where: { employeeNotificationId } });
    }
}
