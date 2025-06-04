import { Injectable } from '@nestjs/common';
import { Notification } from '@libs/entities/notification.entity';
import { BaseService } from '@libs/services/base.service';
import { DomainNotificationRepository } from './notification.repository';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';

@Injectable()
export class DomainNotificationService extends BaseService<Notification> {
    constructor(private readonly notificationRepository: DomainNotificationRepository) {
        super(notificationRepository);
    }

    async count(repositoryOptions: IRepositoryOptions<Notification>): Promise<number> {
        return await this.notificationRepository.count(repositoryOptions);
    }
}
