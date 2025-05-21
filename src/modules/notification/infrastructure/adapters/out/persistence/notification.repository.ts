import { NotificationRepositoryPort } from '@resource/modules/notification/domain/ports/notification.repository.port';
import { Repository } from 'typeorm';
import { Notification } from '@libs/entities/notification.entity';
import { RepositoryOptions } from '@libs/interfaces/repository-option.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotificationDto } from '@resource/modules/notification/application/dto/create-notification.dto';

@Injectable()
export class NotificationRepository implements NotificationRepositoryPort {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
    ) {}
    async save(
        createNotificationDto: CreateNotificationDto,
        options?: RepositoryOptions<Notification>,
    ): Promise<Notification> {
        const repository = options?.queryRunner
            ? options.queryRunner.manager.getRepository(Notification)
            : this.notificationRepository;
        return repository.save(createNotificationDto);
    }

    async findAll(options?: RepositoryOptions<Notification>): Promise<Notification[]> {
        const repository = options?.queryRunner
            ? options.queryRunner.manager.getRepository(Notification)
            : this.notificationRepository;
        return repository.find({
            where: options?.where,
            relations: options?.relations,
            order: options?.order,
            skip: options?.skip,
            take: options?.take,
        });
    }

    async findOne(options?: RepositoryOptions<Notification>): Promise<Notification | null> {
        const repository = options?.queryRunner
            ? options.queryRunner.manager.getRepository(Notification)
            : this.notificationRepository;
        return repository.findOne({
            where: options?.where,
            relations: options?.relations,
        });
    }

    async update(
        notificationId: string,
        updateNotificationDto: Partial<Notification>,
        options?: RepositoryOptions<Notification>,
    ): Promise<Notification> {
        const repository = options?.queryRunner
            ? options.queryRunner.manager.getRepository(Notification)
            : this.notificationRepository;
        await repository.update(notificationId, updateNotificationDto);
        return await this.findOne({ where: { notificationId } });
    }
    async delete(notificationId: string, options?: RepositoryOptions<Notification>): Promise<void> {
        const repository = options?.queryRunner
            ? options.queryRunner.manager.getRepository(Notification)
            : this.notificationRepository;
        await repository.delete(notificationId);
    }

    async count(options?: RepositoryOptions<Notification>): Promise<number> {
        const repository = options?.queryRunner
            ? options.queryRunner.manager.getRepository(Notification)
            : this.notificationRepository;
        return await repository.count({
            where: options?.where,
        });
    }

    // async markAsRead(notificationId: string, options?: RepositoryOptions<Notification>): Promise<void> {
    //     const repository = options?.queryRunner
    //         ? options.queryRunner.manager.getRepository(Notification)
    //         : this.notificationRepository;
    //     await repository.update(notificationId, { isRead: true });
    // }

    // async markAllAsRead(employeeId: string, options?: RepositoryOptions<Notification>): Promise<void> {
    //     const repository = options?.queryRunner
    //         ? options.queryRunner.manager.getRepository(Notification)
    //         : this.notificationRepository;
    //     await repository.update({ employees: { employeeId } }, { isRead: true });
    // }
}
