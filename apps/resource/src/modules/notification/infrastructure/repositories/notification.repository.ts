import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../../domain/entities/notification.entity';

@Injectable()
export class NotificationRepository {
    constructor(
        @InjectRepository(Notification)
        private readonly repository: Repository<Notification>,
    ) {}

    async create(notification: Partial<Notification>): Promise<Notification> {
        const newNotification = this.repository.create(notification);
        return this.repository.save(newNotification);
    }

    async findByUserId(userId: string): Promise<Notification[]> {
        return this.repository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }

    async markAsRead(id: string): Promise<void> {
        await this.repository.update(id, { isRead: true });
    }
}
