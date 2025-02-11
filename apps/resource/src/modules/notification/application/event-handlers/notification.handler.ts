import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationEvent } from '../../domain/events/notification.events';

@Injectable()
export class NotificationEventHandler {
    constructor(private readonly notificationService: NotificationService) {}

    @OnEvent('notification.create')
    async handleCreateNotification(event: CreateNotificationEvent) {
        await this.notificationService.send({
            userId: event.userId,
            title: event.title,
            body: event.body,
            type: event.type,
            data: event.data,
        });
    }
}
