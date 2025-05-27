import { Injectable } from '@nestjs/common';
import { Notification } from '@libs/entities/notification.entity';
import { BaseService } from '@libs/services/base.service';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService extends BaseService<Notification> {
    constructor(private readonly notificationRepository: NotificationRepository) {
        super(notificationRepository);
    }
}
