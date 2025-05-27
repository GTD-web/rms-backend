import { Injectable } from '@nestjs/common';
import { Notification } from '@libs/entities/notification.entity';
import { BaseService } from '@libs/services/base.service';
import { DomainNotificationRepository } from './notification.repository';

@Injectable()
export class DomainNotificationService extends BaseService<Notification> {
    constructor(private readonly notificationRepository: DomainNotificationRepository) {
        super(notificationRepository);
    }
}
