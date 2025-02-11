import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ResourceEvent } from '../../domain/events/resource.events';
import { NotificationType } from '../../../notification/domain/interfaces/notification.interface';
import { CreateNotificationEvent } from '@lib/shared/events/notification.events';

@Injectable()
export class ResourceNotificationHandler {
    @Client({
        transport: Transport.NATS,
        options: {
            servers: [process.env.NATS_URL || 'nats://localhost:4222'],
            queue: 'resource_notifications',
        },
    })
    private natsClient: ClientProxy;

    @OnEvent('resource.*')
    async handleResourceEvent(event: ResourceEvent) {
        const notificationEvent = new CreateNotificationEvent({
            userId: event.userId,
            title: this.getNotificationTitle(event.action),
            body: this.getNotificationBody(event.resourceId, event.action),
            type: this.getNotificationType(event.action),
            data: {
                resourceId: event.resourceId,
                action: event.action,
                timestamp: event.timestamp.toISOString(),
            },
        });

        // NATS를 통해 알림 이벤트 발행
        await this.natsClient.emit('notification.create', notificationEvent).toPromise();
    }

    private getNotificationTitle(action: string): string {
        const titles = {
            allocated: '리소스 할당 완료',
            released: '리소스 해제 완료',
            approved: '리소스 요청 승인',
        };
        return titles[action] || '리소스 상태 변경';
    }

    private getNotificationBody(resourceId: string, action: string): string {
        const messages = {
            allocated: `리소스 ${resourceId}가 성공적으로 할당되었습니다.`,
            released: `리소스 ${resourceId}가 성공적으로 해제되었습니다.`,
            approved: `리소스 ${resourceId} 요청이 승인되었습니다.`,
        };
        return messages[action] || `리소스 ${resourceId}의 상태가 변경되었습니다.`;
    }

    private getNotificationType(action: string): NotificationType {
        const types = {
            allocated: NotificationType.RESOURCE_ALLOCATED,
            released: NotificationType.RESOURCE_RELEASED,
            approved: NotificationType.SYSTEM_ALERT,
        };
        return types[action] || NotificationType.SYSTEM_ALERT;
    }
}
